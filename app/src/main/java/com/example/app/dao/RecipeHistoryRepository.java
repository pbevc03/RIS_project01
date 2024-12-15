package com.example.app.dao;

import com.example.app.vao.RecipeHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeHistoryRepository extends JpaRepository<RecipeHistory, Long> {
    List<RecipeHistory> findByUserId(Long userId);
}
