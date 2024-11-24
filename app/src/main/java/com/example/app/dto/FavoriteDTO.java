package com.example.app.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Data Transfer Object for adding a recipe to favorites")
public class FavoriteDTO {

    @Schema(description = "ID of the user who is favoriting the recipe", example = "1")
    private Long userId;

    @Schema(description = "ID of the recipe to be added to favorites", example = "2")
    private Long recipeId;
}