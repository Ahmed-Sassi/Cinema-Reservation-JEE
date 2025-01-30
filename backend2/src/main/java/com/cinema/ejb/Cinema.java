package com.cinema.ejb;

import com.cinema.entities.*;

import com.cinema.exceptions.*;

import jakarta.ejb.Remote;

import java.util.List;
import java.util.Set;

@Remote
public interface Cinema {
    // List all available films in the cinema
    Set<Film> list();
    
    // Find films matching the given pattern
    Set<Film> findByPattern(String pattern);
    
    // Find a film by its ID
    Film findFilm(int id);
    
    // Reserve a seance for a user
    void reserve(Seance seance, Compte user) 
        throws PlusDePlaceException, SoldeInsuffisantException,
               UserNotFoundException, SoldeNegatifException;
    
    // Get all theater rooms with their programs
    Set<SalleProg> getAllSalleProg();
    
    // Create a new film
    Film createFilm(String name);
    
    // Update film information
    void update(Film f);
    
    // Get ticket price
    float getTarif();


    public Seance findSeance(int seanceId);

    public Compte findUser(int userId);

    public List<Seance> getAllSeances();


    public List<Reservation> getUserReservations(int userId) ;

    public List<Reservation> getAllReservations() ;


}
