package com.example.app.vao;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = true)
    @JsonBackReference
    private Category category;

    private String title;

    @Column(length = 1000)
    private String description;

    @Column(length = 2000)
    private String ingredients;

    @Column(length = 2000)
    private String instructions;
}