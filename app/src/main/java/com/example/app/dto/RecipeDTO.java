package com.example.app.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
public class RecipeDTO {
    private Long id;

    @Schema(description = "Title of the recipe", example = "Spaghetti Carbonara")
    private String title;

    @Schema(description = "Description of the recipe", example = "A classic Italian pasta dish.")
    private String description;

    @Schema(description = "Instructions for the recipe", example = "Boil pasta, cook pancetta, mix with eggs and cheese.")
    private String instructions;

    @Schema(description = "Category ID for the recipe", example = "1")
    private Long categoryId;

    @Schema(description = "List of ingredients with quantities")
    private List<RecipeIngredientDTO> recipeIngredients;
}