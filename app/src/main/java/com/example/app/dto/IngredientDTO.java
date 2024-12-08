package com.example.app.dto;

import lombok.Data;

@Data
public class IngredientDTO {
    private Long id;       // Optional: For updates or unique identification
    private String name;   // Name of the ingredient
}