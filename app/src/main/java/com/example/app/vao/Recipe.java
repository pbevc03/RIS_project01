package com.example.app.vao;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = true)
    private Category category;

    private String title;

    @Column(length = 1000)
    private String description;

    @Column(length = 2000)
    private String ingredients;

    @Column(length = 2000)
    private String instructions;
}