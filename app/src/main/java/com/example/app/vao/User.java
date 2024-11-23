package com.example.app.vao;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    private String username;
    private String password;
    private String email;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "iduporabnik")
    private List<Recept> recepti = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_favorites")
    private List<Recept> favoriteRecepti = new ArrayList<>();

    public void addRecept(Recept recept) {
        recept.setUser(this);
        recepti.add(recept);
    }

    public void editRecept(int id, Recept updatedRecept) {
        for (Recept recept : recepti) {
            if (recept.getIdrecept() == id) {
                recept.setIme(updatedRecept.getIme());
                recept.setSestavine(updatedRecept.getSestavine());
                recept.setNavodila(updatedRecept.getNavodila());
                return;
            }
        }
    }

    public void deleteRecept(int id) {
        recepti.removeIf(recept -> recept.getIdrecept() == id);
    }

    public void saveReceptToFavorites(Recept recept) {
        if (!favoriteRecepti.contains(recept)) {
            favoriteRecepti.add(recept);
        }
    }

    public void writeComment(String comment) {
    }
}