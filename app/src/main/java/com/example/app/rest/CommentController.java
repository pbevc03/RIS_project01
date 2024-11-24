package com.example.app.rest;

import com.example.app.dao.CommentRepository;
import com.example.app.dao.RecipeRepository;
import com.example.app.dao.UserRepository;
import com.example.app.dto.CommentDTO;
import com.example.app.vao.Comment;
import com.example.app.vao.Recipe;
import com.example.app.vao.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    // Add a new comment
    @PostMapping
    public Comment createComment(@RequestBody CommentDTO commentDTO) {
        User user = userRepository.findById(commentDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + commentDTO.getUserId()));
        Recipe recipe = recipeRepository.findById(commentDTO.getRecipeId())
                .orElseThrow(() -> new RuntimeException("Recipe not found with ID: " + commentDTO.getRecipeId()));

        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setUser(user);
        comment.setRecipe(recipe);

        return commentRepository.save(comment);
    }

    @GetMapping("/{id}")
    public Comment getCommentById(@PathVariable Long id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with ID: " + id));
    }

    // Get all comments by a specific user
    @GetMapping("/user/{userId}")
    public List<Comment> getCommentsByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        return commentRepository.findByUser(user);
    }

    // Get all comments for a specific recipe
    @GetMapping("/recipe/{recipeId}")
    public List<Comment> getCommentsByRecipe(@PathVariable Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found with ID: " + recipeId));
        return commentRepository.findByRecipe(recipe);
    }

    // Delete a comment by ID
    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with ID: " + id));
        commentRepository.delete(comment);
    }
}
