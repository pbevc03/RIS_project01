package com.example.app.dao;

import com.example.app.vao.Comment;
import com.example.app.vao.Recipe;
import com.example.app.vao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByUser(User user); // Find comments by user
    List<Comment> findByRecipe(Recipe recipe); // Find comments by recipe
}
