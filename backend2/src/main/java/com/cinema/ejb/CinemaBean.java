package com.cinema.ejb;

import com.cinema.entities.*;

import com.cinema.exceptions.*;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Stateless
public class CinemaBean implements Cinema {
    
    @PersistenceContext
    private EntityManager em;
    
    private static final float TICKET_PRICE = 50.0f;
    
    @Override
    public Set<Film> list() {
        TypedQuery<Film> query = em.createNamedQuery("findAllFilms", Film.class);
        List<Film> films = query.getResultList();
        return new HashSet<>(films);
    }
    
    @Override
    public Set<Film> findByPattern(String pattern) {
        TypedQuery<Film> query = em.createNamedQuery("findFilmByPattern", Film.class);
        query.setParameter("pattern", "%" + pattern + "%");
        List<Film> films = query.getResultList();
        return new HashSet<>(films);
    }
    
    @Override
    public Film findFilm(int id) {
        return em.find(Film.class, id);
    }




    @Override
    public void reserve(Seance seance, Compte user)
            throws PlusDePlaceException, SoldeInsuffisantException,
            UserNotFoundException, SoldeNegatifException {

        if (user == null) {
            throw new UserNotFoundException();
        }

        if (seance == null) {
            throw new IllegalArgumentException("Séance non trouvée");
        }

        // Check available places - la logique est inversée dans votre code
        if (seance.getPlaces() <= 0) {  // Si plus de places disponibles
            throw new PlusDePlaceException();
        }

        // Check user balance - utiliser le tarif de la séance, pas une constante
        if (user.getSolde() < seance.getTarif()) {
            throw new SoldeInsuffisantException();
        }

        // Create reservation
        Reservation reservation = new Reservation();
        reservation.setSeance(seance);
        reservation.setCompte(user);

        // Update seance places - décrémenter au lieu d'incrémenter
        seance.setPlaces(seance.getPlaces() - 1);

        // Update user balance avec le tarif de la séance
        double nouveauSolde = user.getSolde() - seance.getTarif();
        if (nouveauSolde < 0) {
            throw new SoldeNegatifException();
        }
        user.setSolde((float) nouveauSolde);

        try {
            // Persist changes dans une transaction
            em.persist(reservation);
            em.merge(seance);
            em.merge(user);
            em.flush(); // S'assurer que les changements sont écrits
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la sauvegarde de la réservation", e);
        }
    }

    /*

    @Override
    public void reserve(Seance seance, Compte user)
            throws PlusDePlaceException, SoldeInsuffisantException,
                   UserNotFoundException, SoldeNegatifException {

        if (user == null) {
            throw new UserNotFoundException();
        }

        // Check available places
        if (seance.getPlaces() >= seance.getSalle().getCapacity()) {
            throw new PlusDePlaceException();
        }

        // Check user balance
        if (user.getSolde() < TICKET_PRICE) {
            throw new SoldeInsuffisantException();
        }

        // Create reservation
        Reservation reservation = new Reservation();
        reservation.setSeance(seance);
        reservation.setCompte(user);

        // Update seance places
        seance.setPlaces(seance.getPlaces() + 1);

        // Update user balance
        user.setSolde(user.getSolde() - TICKET_PRICE);

        // Persist changes
        em.persist(reservation);
        em.merge(seance);
        em.merge(user);
    }


     */




    
    @Override
    public Set<SalleProg> getAllSalleProg() {
        TypedQuery<SalleProg> query = em.createQuery("SELECT s FROM SalleProg s", SalleProg.class);
        List<SalleProg> salles = query.getResultList();
        return new HashSet<>(salles);
    }

    @Override
    public List<Seance> getAllSeances() {
        TypedQuery<Seance> query = em.createQuery("SELECT s FROM Seance s", Seance.class);
        return query.getResultList();
    }
    
    @Override
    public Film createFilm(String name) {
        Film film = new Film();
        film.setName(name);
        em.persist(film);
        return film;
    }
    
    @Override
    public void update(Film f) {
        em.merge(f);
    }
    
    @Override
    public float getTarif() {
        return TICKET_PRICE;
    }


    // In Cinema.java
    public Seance findSeance(int seanceId) {
        // Implementation to find a seance by ID
        return em.find(Seance.class, seanceId);
    }

    public Compte findUser(int userId) {
        // Implementation to find a user by ID
        return em.find(Compte.class, userId);
    }

    public List<Reservation> getAllReservations() {
        return em.createQuery("SELECT r FROM Reservation r", Reservation.class)
                .getResultList();
    }

    public List<Reservation> getUserReservations(int userId) {
        return em.createQuery("SELECT r FROM Reservation r WHERE r.compte.id = :userId", Reservation.class)
                .setParameter("userId", userId)
                .getResultList();
    }



}
