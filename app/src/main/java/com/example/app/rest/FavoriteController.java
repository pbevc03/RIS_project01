package com.example.app.rest;

import com.example.app.dao.FavoriteRepository;
import com.example.app.dao.UserRepository;
import com.example.app.dto.FavoriteDTO;
import com.example.app.vao.Favorite;
import com.example.app.vao.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    // Get all favorite recipes for a user
    @GetMapping("/{userId}")
    public List<Favorite> getFavoritesForUser(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
        return favoriteRepository.findAllByUser(user.get());
    }

    // Add a recipe to favorites
    @PostMapping
    public Favorite addFavorite(@RequestBody FavoriteDTO favoriteDTO) {
        User user = userRepository.findById(favoriteDTO.getUserId()).orElseThrow(() ->
                new RuntimeException("User not found with ID: " + favoriteDTO.getUserId()));
        Recipe recipe = recipeRepository.findById(favoriteDTO.getRecipeId()).orElseThrow(() ->
                new RuntimeException("Recipe not found with ID: " + favoriteDTO.getRecipeId()));

        if (favoriteRepository.existsByUserAndRecipe(user, recipe)) {
            throw new RuntimeException("Recipe is already in favorites.");
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setRecipe(recipe);

        return favoriteRepository.save(favorite);
    }

    // Remove a recipe from favorites
    @DeleteMapping
    public void removeFavorite(@RequestParam Long userId, @RequestParam Long recipeId) {
        // Validate user and recipe
        Optional<User> user = userRepository.findById(userId);
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);

        if (user.isEmpty() || recipe.isEmpty()) {
            throw new RuntimeException("Invalid user or recipe ID.");
        }

        // Find and delete the favorite
        Favorite favorite = favoriteRepository.findByUserAndRecipe(user.get(), recipe.get())
                .orElseThrow(() -> new RuntimeException("Favorite not found."));
        favoriteRepository.delete(favorite);
    }
}