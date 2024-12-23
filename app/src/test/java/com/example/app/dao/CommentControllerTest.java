package com.example.app.dao;

import com.example.app.dto.CommentDTO;
import com.example.app.rest.CommentController;
import com.example.app.vao.Comment;
import com.example.app.vao.User;
import com.example.app.vao.Recipe;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for CommentController, verifying the core functionalities related
 * to comments:
 * - Adding a comment
 * - Deleting a comment
 * - Handling invalid cases such as non-existent users and recipes
 */
@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
public class CommentControllerTest {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentController commentController;

    private User testUser;
    private Recipe testRecipe;

    @BeforeEach
    void setUp() {

        commentRepository.deleteAll();
        recipeRepository.deleteAll();
        userRepository.deleteAll();

        // Set up test user and recipe
        testUser = userRepository.save(User.builder()
                .username("TestUser")
                .email("testuser@example.com")
                .password("password")
                .build());

        testRecipe = recipeRepository.save(Recipe.builder()
                .title("Test Recipe")
                .description("Test Description")
                //.ingredients("Test Ingredients")
                .instructions("Test Instructions")
                .user(testUser)
                .build());
    }

    /**
     * This test ensures that a new comment can be successfully added for a valid
     * user and recipe.
     * It checks that the comment is saved correctly with the expected content,
     * user, and recipe associations.
     */
    @Test
    @Order(1)
    @DisplayName("Test: Add Comment - Positive Case")
    void shouldAddCommentWithValidData() {

        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setContent("This is a valid test comment.");
        commentDTO.setUserId(testUser.getId());
        commentDTO.setRecipeId(testRecipe.getId());

        Comment createdComment = commentController.createComment(commentDTO);

        assertNotNull(createdComment.getId(), "ID komentarja mora biti nastavljen.");
        assertEquals("This is a valid test comment.", createdComment.getContent());
        assertEquals(testUser.getId(), createdComment.getUser().getId());
        assertEquals(testRecipe.getId(), createdComment.getRecipe().getId());
    }

    /**
     * This test verifies the behavior when attempting to add a comment with an
     * invalid user ID.
     * It ensures that a runtime exception is thrown with the appropriate error
     * message.
     */
    @Test
    @Order(2)
    @Timeout(1)
    @DisplayName("Test: Add Comment - Invalid User")
    void shouldFailToAddCommentWithInvalidUser() {

        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setContent("Invalid User Comment");
        commentDTO.setUserId(-1L);
        commentDTO.setRecipeId(testRecipe.getId());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> commentController.createComment(commentDTO));

        assertEquals("User not found with ID: -1", exception.getMessage());
    }

    /**
     * This test ensures that a comment can be successfully deleted.
     * It saves a comment to the repository and then deletes it, verifying that it
     * no longer exists in the database.
     */
    @Test
    @Order(3)
    @RepeatedTest(2)
    @DisplayName("Test: Delete Comment - Positive Case")
    void shouldDeleteExistingComment() {

        Comment comment = commentRepository.save(Comment.builder()
                .content("Comment to delete")
                .user(testUser)
                .recipe(testRecipe)
                .build());

        assertTrue(commentRepository.existsById(comment.getId()));

        commentController.deleteComment(comment.getId());

        assertFalse(commentRepository.existsById(comment.getId()));
    }

    /**
     * This test checks the behavior when attempting to delete a comment that does
     * not exist.
     * It ensures that the proper exception is thrown, indicating the comment is not
     * found.
     */
    @Test
    @Order(4)
    @DisplayName("Test: Delete Comment - Non-Existent Comment")
    void shouldFailToDeleteNonExistentComment() {

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> commentController.deleteComment(-1L));

        assertEquals("Comment not found with ID: -1", exception.getMessage());
    }

    /**
     * This test checks the behavior when fetching comments for a specific recipe
     * that has comments.
     * It ensures that the correct number of comments is returned for the recipe.
     */
    @Test
    @Order(5)
    @DisplayName("Test: Get All Comments for Recipe")
    void shouldGetAllCommentsForValidRecipe() {

        commentRepository.save(Comment.builder()
                .content("First comment")
                .user(testUser)
                .recipe(testRecipe)
                .build());
        commentRepository.save(Comment.builder()
                .content("Second comment")
                .user(testUser)
                .recipe(testRecipe)
                .build());

        Iterable<Comment> comments = commentController.getCommentsByRecipe(testRecipe.getId());

        assertNotNull(comments);
        assertEquals(2, commentRepository.count());
    }

    /**
     * This test checks the behavior when trying to retrieve comments for a
     * non-existent recipe.
     * It ensures that no comments are returned (empty list) if the recipe does not
     * exist.
     */
    @Test
    @Order(6)
    @Tag("edge-case")
    @DisplayName("Test: Get Comments - Invalid Recipe")
    void shouldReturnNoCommentsForInvalidRecipe() {

        Iterable<Comment> comments = commentController.getCommentsByRecipe(-1L);

        assertFalse(comments.iterator().hasNext(), "Komentarji za neobstoječ recept morajo biti prazni.");
    }
}