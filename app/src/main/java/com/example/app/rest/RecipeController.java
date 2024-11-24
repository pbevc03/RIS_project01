package com.example.app.rest;

import com.example.app.dao.RecipeRepository;
import com.example.app.dao.CategoryRepository;
import com.example.app.dao.UserRepository;
import com.example.app.dto.RecipeDTO;
import com.example.app.vao.Recipe;
import com.example.app.vao.Category;
import com.example.app.vao.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // Get all recipes
    @GetMapping
    public Iterable<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    // Create a new recipe
    @PostMapping
    public Recipe createRecipe(@RequestBody RecipeDTO recipeDTO, @RequestParam Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Recipe recipe = new Recipe();
        recipe.setTitle(recipeDTO.getTitle());
        recipe.setDescription(recipeDTO.getDescription());
        recipe.setIngredients(recipeDTO.getIngredients());
        recipe.setInstructions(recipeDTO.getInstructions());
        recipe.setUser(user);

        if (recipeDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(recipeDTO.getCategoryId())
                    .orElseThrow(
                            () -> new RuntimeException("Category not found with ID: " + recipeDTO.getCategoryId()));
            recipe.setCategory(category);
        }

        return recipeRepository.save(recipe);
    }

    // Update an existing recipe
    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @RequestBody RecipeDTO recipeDTO) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with ID: " + id));

        if (recipeDTO.getTitle() != null)
            recipe.setTitle(recipeDTO.getTitle());
        if (recipeDTO.getDescription() != null)
            recipe.setDescription(recipeDTO.getDescription());
        if (recipeDTO.getIngredients() != null)
            recipe.setIngredients(recipeDTO.getIngredients());
        if (recipeDTO.getInstructions() != null)
            recipe.setInstructions(recipeDTO.getInstructions());

        if (recipeDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(recipeDTO.getCategoryId())
                    .orElseThrow(
                            () -> new RuntimeException("Category not found with ID: " + recipeDTO.getCategoryId()));
            recipe.setCategory(category);
        }

        return recipeRepository.save(recipe);
    }

    // Delete a recipe
    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        if (!recipeRepository.existsById(id)) {
            throw new RuntimeException("Recipe not found with ID: " + id);
        }
        recipeRepository.deleteById(id);
    }
}
