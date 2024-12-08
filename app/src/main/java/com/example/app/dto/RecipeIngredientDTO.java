package com.example.app.dto;

import lombok.Data;

@Data
public class RecipeIngredientDTO {
    private String ingredientName;
    private Double quantity;
    private String unit;
}