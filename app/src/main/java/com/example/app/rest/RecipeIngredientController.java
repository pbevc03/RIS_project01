package com.example.app.rest;

import com.example.app.dao.RecipeIngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/recipe_ingredient")
public class RecipeIngredientController {

    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;
}
