package com.example.app.rest;

import com.example.app.dao.IngredientRepository;
import com.example.app.dto.IngredientDTO;
import com.example.app.vao.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/ingredients")
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

    // Get all ingredients
    @GetMapping
    public List<IngredientDTO> getAllIngredients() {
        return ingredientRepository.findAll().stream()
                .map(ingredient -> {
                    IngredientDTO dto = new IngredientDTO();
                    dto.setId(ingredient.getId());
                    dto.setName(ingredient.getName());
                    return dto;
                })
                .collect(Collectors.toList());
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