package com.cinema.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import jakarta.json.bind.annotation.JsonbTransient;

@Entity
@Table(name = "RESERVATIONS")
public class Reservation implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    @ManyToOne
    @JoinColumn(name = "seance_id")
    @JsonbTransient
    private Seance seance;
    
    @ManyToOne
    @JoinColumn(name = "compte_id")
    @JsonbTransient
    private Compte compte;
    
    public Reservation() {
        super();
    }
    
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public Seance getSeance() {
        return seance;
    }
    
    public void setSeance(Seance seance) {
        this.seance = seance;
    }
    
    public Compte getCompte() {
        return compte;
    }
    
    public void setCompte(Compte compte) {
        this.compte = compte;
    }
}
