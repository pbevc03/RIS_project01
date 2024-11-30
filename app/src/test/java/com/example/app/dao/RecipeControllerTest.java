package com.example.app.dao;


import com.example.app.dto.RecipeDTO;
import com.example.app.rest.RecipeController;
import com.example.app.vao.Recipe;
import com.example.app.vao.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Assertions;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import org.springframework.web.bind.MethodArgumentNotValidException;

@SpringBootTest
public class RecipeControllerTest {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private RecipeController recipeController;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        recipeRepository.deleteAll();
        userRepository.deleteAll();
    }

    /**
     * This test ensures that a new User is created and saved to the repository.
     * It initializes a User with specific details and verifies that the user is saved correctly in the database.
     */
    @TestTemplate
    private User createAndSaveTestUser() {
        User user = new User();
        user.setUsername("Metka");
        user.setEmail("metka.novak@gmail.com");
        user.setPassword("metka123");
        return userRepository.save(user);
    }

    /**
     * This test verifies that when multiple recipes are added to the repository,
     * the `getAllRecipes()` method in the controller returns the expected number of recipes.
     * It checks that two recipes are saved, and the response contains at least one recipe.
     */
    @Test
    void getAllRecipes() {

        User user = createAndSaveTestUser();

        recipeRepository.save(Recipe.builder()
                .title("Recept01")
                .description("Description01")
                .ingredients("Ingredients01")
                .instructions("Instructions01")
                .user(user)
                .build());

        recipeRepository.save(Recipe.builder()
                .title("Recept02")
                .description("Description02")
                .ingredients("Ingredients02")
                .instructions("Instructions02")
                .user(user)
                .build());

        Iterable<Recipe> recipes = recipeController.getAllRecipes();
        Assertions.assertTrue(recipes.iterator().hasNext());
        Assertions.assertEquals(2, recipeRepository.count());
    }

    /**
     * This test verifies that a recipe is successfully created and returned when valid data is provided.
     * It checks that the recipe is created with the specified title, description, ingredients, and instructions.
     */
    @Test
    void postRecipe() {

        User user = createAndSaveTestUser();

        RecipeDTO recipeDTO = new RecipeDTO();
        recipeDTO.setTitle("Recipe01");
        recipeDTO.setDescription("Description01");
        recipeDTO.setIngredients("Ingredients01");
        recipeDTO.setInstructions("Instructions01");

        Recipe createdRecipe = recipeController.createRecipe(recipeDTO, user.getId());

        Assertions.assertNotNull(createdRecipe);
        Assertions.assertEquals("Recipe01", createdRecipe.getTitle());
        Assertions.assertEquals("Description01", createdRecipe.getDescription());
        Assertions.assertEquals("Ingredients01", createdRecipe.getIngredients());
        Assertions.assertEquals("Instructions01", createdRecipe.getInstructions());

    }

    /**
     * This test ensures that an exception is thrown when attempting to create a recipe with invalid data (missing title).
     * It verifies that the correct exception is thrown and that the message indicates the missing field.
     */
    @Test
    void postRecipeWithInvalidData() {
        User user = createAndSaveTestUser();

        RecipeDTO recipeDTO = new RecipeDTO();
        recipeDTO.setDescription("Description01");
        recipeDTO.setIngredients("Ingredients01");
        recipeDTO.setInstructions("Instructions01");

        try {
            recipeController.createRecipe(recipeDTO, user.getId());

            Assertions.fail("Expected IllegalArgumentException was not thrown");
        } catch (IllegalArgumentException e) {
            String expectedMessage = "Title cannot be null";
            String actualMessage = e.getMessage();

            Assertions.assertTrue(actualMessage.contains(expectedMessage),
                    "Expected message to contain: " + expectedMessage + " but got: " + actualMessage);
        }
    }

    /**
     * This test checks that when a non-existent user is provided (invalid user ID),
     * the recipe creation fails with an appropriate exception, and the message indicates the user is not found.
     */
    @Test
    void postRecipeWithInvalidUser() {
        RecipeDTO recipeDTO = new RecipeDTO();
        recipeDTO.setTitle("Recipe01");
        recipeDTO.setDescription("Description01");
        recipeDTO.setIngredients("Ingredients01");
        recipeDTO.setInstructions("Instructions01");

        Long invalidUserId = -1L;

        try {
            Recipe createdRecipe = recipeController.createRecipe(recipeDTO, invalidUserId);
            Assertions.fail("Expected exception was not thrown");
        } catch (Exception e) {
            Assertions.assertTrue(e instanceof RuntimeException, "Expected exception type: RuntimeException but got: " + e.getClass());
            Assertions.assertEquals("User not found with ID: " + invalidUserId, e.getMessage());
        }
    }
}
