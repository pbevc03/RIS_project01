package com.example.app.dto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class CategoryDTO {
    @Schema(description = "Name of the category", example = "Desserts")
    private String name;
}