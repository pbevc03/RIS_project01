package com.example.app.vao;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Recept {

    public Recept(String ime, String sestavine, String navodila) {
        this.ime = ime;
        this.sestavine = sestavine;
        this.navodila = navodila;
    }

    private String ime;
    private String sestavine;
    private String navodila;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
}
