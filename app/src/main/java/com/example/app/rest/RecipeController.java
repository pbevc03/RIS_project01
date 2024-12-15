package com.example.app.rest;

import com.example.app.dao.*;
import com.example.app.dto.RecipeDTO;
import com.example.app.dto.RecipeIngredientDTO;
import com.example.app.vao.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeHistoryRepository recipeHistoryRepository;

    // Get all recipes
    @GetMapping
    public List<RecipeDTO> getAllRecipes() {
        return recipeRepository.findAll().stream()
                .map(recipe -> {
                    RecipeDTO dto = new RecipeDTO();
                    dto.setId(recipe.getId());
                    dto.setTitle(recipe.getTitle());
                    dto.setDescription(recipe.getDescription());
                    dto.setInstructions(recipe.getInstructions());
                    dto.setCategoryId(recipe.getCategory() != null ? recipe.getCategory().getId() : null);
                    dto.setRecipeIngredients(recipe.getRecipeIngredients().stream()
                            .map(recipeIngredient -> {
                                RecipeIngredientDTO ingredientDTO = new RecipeIngredientDTO();
                                ingredientDTO.setIngredientId(recipeIngredient.getIngredient().getId());
                                ingredientDTO.setIngredientName(recipeIngredient.getIngredient().getName());
                                ingredientDTO.setQuantity(recipeIngredient.getQuantity());
                                ingredientDTO.setUnit(recipeIngredient.getUnit());
                                return ingredientDTO;
                            }).collect(Collectors.toList()));
                    return dto;
                }).collect(Collectors.toList());
    }

    //GET THE HISTORY OF THE USER
    @GetMapping("/history/{userId}")
    public List<RecipeDTO> getUserRecipeHistory(@PathVariable Long userId) {
        List<RecipeHistory> historyList = recipeHistoryRepository.findByUserId(userId);

        List<RecipeDTO> recipeDTOList = new ArrayList<>();

        for (RecipeHistory history : historyList) {
            Recipe recipe = history.getRecipe();
            RecipeDTO dto = new RecipeDTO();

            dto.setTitle(recipe.getTitle());
            dto.setDescription(recipe.getDescription());
            dto.setInstructions(recipe.getInstructions());

            if (recipe.getCategory() != null) {
                dto.setCategoryId(recipe.getCategory().getId());
            }
            recipeDTOList.add(dto);
        }
        return recipeDTOList;
    }


    // NEW VIEW IS ADDED AND SAVED TO THE DATABASE
    @PostMapping("/view/{recipeId}")
    public void logRecipeView(@PathVariable Long recipeId, @RequestParam Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found with ID: " + recipeId));

        RecipeHistory history = new RecipeHistory();
        history.setUser(user);
        history.setRecipe(recipe);

        recipeHistoryRepository.save(history);
    }

    // Create a new recipe
    @PostMapping
    public Recipe createRecipe(@RequestBody RecipeDTO recipeDTO, @RequestParam Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Recipe recipe = new Recipe();
        recipe.setTitle(recipeDTO.getTitle());
        recipe.setDescription(recipeDTO.getDescription());
        recipe.setInstructions(recipeDTO.getInstructions());
        recipe.setUser(user);

        if (recipeDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(recipeDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with ID: " + recipeDTO.getCategoryId()));
            recipe.setCategory(category);
        }

        // Map and save RecipeIngredients
        List<RecipeIngredient> recipeIngredients = recipeDTO.getRecipeIngredients().stream().map(dto -> {
            Ingredient ingredient = ingredientRepository.findByName(dto.getIngredientName())
                    .orElseGet(() -> {
                        Ingredient newIngredient = new Ingredient();
                        newIngredient.setName(dto.getIngredientName());
                        return ingredientRepository.save(newIngredient);
                    });

            RecipeIngredient recipeIngredient = new RecipeIngredient();
            recipeIngredient.setIngredient(ingredient);
            recipeIngredient.setQuantity(dto.getQuantity());
            recipeIngredient.setUnit(dto.getUnit());
            recipeIngredient.setRecipe(recipe);
            return recipeIngredient;
        }).collect(Collectors.toList());

        recipe.setRecipeIngredients(recipeIngredients);

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
        if (recipeDTO.getInstructions() != null)
            recipe.setInstructions(recipeDTO.getInstructions());
        if (recipeDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(recipeDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with ID: " + recipeDTO.getCategoryId()));
            recipe.setCategory(category);
        }

        // Update RecipeIngredients
        if (recipeDTO.getRecipeIngredients() != null) {
            recipe.getRecipeIngredients().clear();

            List<RecipeIngredient> updatedIngredients = recipeDTO.getRecipeIngredients().stream().map(dto -> {
                Ingredient ingredient = ingredientRepository.findByName(dto.getIngredientName())
                        .orElseGet(() -> {
                            Ingredient newIngredient = new Ingredient();
                            newIngredient.setName(dto.getIngredientName());
                            return ingredientRepository.save(newIngredient);
                        });

                RecipeIngredient recipeIngredient = new RecipeIngredient();
                recipeIngredient.setIngredient(ingredient);
                recipeIngredient.setQuantity(dto.getQuantity());
                recipeIngredient.setUnit(dto.getUnit());
                recipeIngredient.setRecipe(recipe);
                return recipeIngredient;
            }).collect(Collectors.toList());

            recipe.setRecipeIngredients(updatedIngredients);
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