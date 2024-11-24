package com.example.app.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Data Transfer Object for creating a new comment")
public class CommentDTO {
    @Schema(description = "The content of the comment", example = "This recipe is amazing!")
    private String content;

    @Schema(description = "ID of the user making the comment", example = "1")
    private Long userId;

    @Schema(description = "ID of the recipe being commented on", example = "2")
    private Long recipeId;
}
