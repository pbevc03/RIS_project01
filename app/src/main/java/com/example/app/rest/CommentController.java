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
        User user = userRepository.findById(commentDTO.getUserId()).orElseThrow(() ->
                new RuntimeException("User not found with ID: " + commentDTO.getUserId()));
        Recipe recipe = recipeRepository.findById(commentDTO.getRecipeId()).orElseThrow(() ->
                new RuntimeException("Recipe not found with ID: " + commentDTO.getRecipeId()));

        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setUser(user);
        comment.setRecipe(recipe);

        return commentRepository.save(comment);
    }
}
