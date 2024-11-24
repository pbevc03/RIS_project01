package com.example.app.dao;

import com.example.app.vao.Favorite;
import com.example.app.vao.Recipe;
import com.example.app.vao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findAllByUser(User user);

    boolean existsByUserAndRecipe(User user, Recipe recipe);

    Optional<Favorite> findByUserAndRecipe(User user, Recipe recipe);
}