package com.cinema.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "COMPTES")
@NamedQueries({
    @NamedQuery(name = "findAllComptes", query = "SELECT c FROM Compte c"),
    @NamedQuery(name = "findCompteByName", query = "SELECT c FROM Compte c WHERE c.name = :cname"),
    @NamedQuery(name = "findCompteById", query = "SELECT c FROM Compte c WHERE c.id = :cid")
})
public class Compte implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    private String name;
    
    private String password;
    
    private float solde;
    
    @OneToMany(mappedBy = "compte")
    private Set<Reservation> reservations;
    
    public Compte() {
        super();
    }
    
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public float getSolde() {
        return solde;
    }
    
    public void setSolde(float solde) {
        this.solde = solde;
    }
    
    public Set<Reservation> getReservations() {
        return reservations;
    }
    
    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }
}
