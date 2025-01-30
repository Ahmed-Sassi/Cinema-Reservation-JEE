package com.cinema.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.json.bind.annotation.JsonbVisibility;
import jakarta.json.bind.config.PropertyVisibilityStrategy;

@Entity
@Table(name = "SEANCES")
public class Seance implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date datetime;
    
    private int places;

    private Double tarif;

    
    @ManyToOne
    @JoinColumn(name = "film_id")
    private Film film;
    
    @ManyToOne
    @JoinColumn(name = "salle_id")
    private SalleProg salle;
    
    @OneToMany(mappedBy = "seance")
    @JsonbTransient
    private Set<Reservation> reservations;
    
    public Seance() {
        super();
    }
    
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public Date getDatetime() {
        return datetime;
    }
    
    public void setDatetime(Date datetime) {
        this.datetime = datetime;
    }
    
    public int getPlaces() {
        return places;
    }
    
    public void setPlaces(int places) {
        this.places = places;
    }
    
    public Film getFilm() {
        return film;
    }
    
    public void setFilm(Film film) {
        this.film = film;
    }
    
    public SalleProg getSalle() {
        return salle;
    }
    
    public void setSalle(SalleProg salle) {
        this.salle = salle;
    }
    
    public Set<Reservation> getReservations() {
        return reservations;
    }
    
    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }




    public Double getTarif() {
        return tarif;
    }

    public void setTarif(Double tarif) {
        this.tarif = tarif;
    }
}
