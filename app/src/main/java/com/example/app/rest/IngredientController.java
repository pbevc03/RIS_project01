package com.example.app.rest;

import com.example.app.dao.IngredientRepository;
import com.example.app.dao.RecipeIngredientRepository;
import com.example.app.dao.RecipeRepository;
import com.example.app.dto.IngredientDTO;
import com.example.app.vao.Ingredient;
import com.example.app.vao.Recipe;
import com.example.app.vao.RecipeIngredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/ingredients")
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;
    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;
    @Autowired
    private RecipeRepository recipeRepository;

    // Get all ingredients
    @GetMapping("/recipe/{recipeId}")
    public List<IngredientDTO> getAllIngredients(@PathVariable Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId) .orElseThrow(() -> new RuntimeException("Recipe not found"));
        /*return ingredientRepository.findAll().stream()
                .map(ingredient -> {
                    IngredientDTO dto = new IngredientDTO();
                    dto.setId(ingredient.getId());
                    dto.setName(ingredient.getName());
                    return dto;
                })
                .collect(Collectors.toList());*/

        // setnes se quantity pa unit
        List<RecipeIngredient> ingr = recipe.getIngredients().stream().collect(Collectors.toList());
        List<IngredientDTO> imena = new ArrayList<>();
        for (RecipeIngredient ingredient : ingr) {
            IngredientDTO ingredientDTO = new IngredientDTO();
            ingredientDTO.setId(ingredient.getId());
            ingredientDTO.setName(ingredient.getName());
            ingredientDTO.setQuantity(ingredient.getQuantity());
            ingredientDTO.setUnit(ingredient.getUnit());
            imena.add(ingredientDTO);
        }
        return imena;

    }

    // Create a new ingredient
    @PostMapping
    public IngredientDTO createIngredient(@RequestBody IngredientDTO ingredientDTO) {
        Ingredient ingredient = new Ingredient();
        ingredient.setName(ingredientDTO.getName());
        ingredient = ingredientRepository.save(ingredient);

        ingredientDTO.setId(ingredient.getId());
        return ingredientDTO;
    }

    // Update an existing ingredient
    @PutMapping("/{id}")
    public IngredientDTO updateIngredient(@PathVariable Long id, @RequestBody IngredientDTO ingredientDTO) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found with ID: " + id));

        ingredient.setName(ingredientDTO.getName());
        ingredient = ingredientRepository.save(ingredient);

        ingredientDTO.setId(ingredient.getId());
        return ingredientDTO;
    }

    // Delete an ingredient
    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable Long id) {
        if (!ingredientRepository.existsById(id)) {
            throw new RuntimeException("Ingredient not found with ID: " + id);
        }
        ingredientRepository.deleteById(id);
    }
}