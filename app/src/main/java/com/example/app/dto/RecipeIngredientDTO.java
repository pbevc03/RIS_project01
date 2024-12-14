package com.example.app.dto;

import lombok.Data;

@Data
public class RecipeIngredientDTO {
    private Long ingredientId;
    private String ingredientName;
    private Double quantity;
    private String unit;
}