package com.example.app.dao;

import com.example.app.vao.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {
    //@Query("SELECT ri FROM RecipeIngredient ri WHERE ri.recipe.id = :recipe_id")
    List<RecipeIngredient> findByRecipeId(Long recipe_id);
}