package com.cinema.entities;

import jakarta.persistence.*;
import jakarta.json.bind.annotation.JsonbTransient;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "FILMS")
@NamedQueries({
    @NamedQuery(name = "findAllFilms", query = "SELECT f FROM Film f"),
    @NamedQuery(name = "findFilmByPattern", query = "SELECT f FROM Film f WHERE f.name LIKE :pattern")
})
public class Film implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    private String name;
    @JsonbTransient
    @OneToMany(mappedBy = "film", cascade = CascadeType.ALL)
    private Set<Seance> seances;
    
    public Film() {
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
    
    public Set<Seance> getSeances() {
        return seances;
    }
    
    public void setSeances(Set<Seance> seances) {
        this.seances = seances;
    }
}
