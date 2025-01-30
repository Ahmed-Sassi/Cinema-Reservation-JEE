package com.cinema.rest;

import com.cinema.ejb.Cinema;

import com.cinema.entities.*;

import java.util.List;
import java.util.Set;

import com.cinema.exceptions.PlusDePlaceException;
import com.cinema.exceptions.SoldeInsuffisantException;
import com.cinema.exceptions.SoldeNegatifException;
import jakarta.ejb.EJB;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import com.cinema.rest.*;
import com.cinema.rest.model.FilmRequest;
import com.cinema.rest.model.ReservationRequest;




@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CinemaResource {
    
    @EJB
    private Cinema cinema;
    
    @GET
    @Path("/films")
    public Response getAllFilms() {
        Set<Film> films = cinema.list();
        return Response.ok(films).build();
    }
    
    @GET
    @Path("/films/search/{pattern}")
    public Response searchFilms(@PathParam("pattern") String pattern) {
        Set<Film> films = cinema.findByPattern(pattern);
        return Response.ok(films).build();
    }
    
    @GET
    @Path("/films/{id}")
    public Response getFilm(@PathParam("id") int id) {
        Film film = cinema.findFilm(id);
        if (film == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(film).build();
    }
    
    @GET
    @Path("/films/{id}/seances")
    public Response getFilmSeances(@PathParam("id") int id) {
        Film film = cinema.findFilm(id);
        if (film == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(film.getSeances()).build();
    }

    @GET
    @Path("/reservations")
    public Response getAllReservation() {
        List<Reservation> reservations = cinema.getAllReservations();
        return Response.ok(reservations).build();
    }

    @GET
    @Path("/reservations/user/{userId}")
    public Response getUserReservation(@PathParam("userId") int userId) {
        Compte user = cinema.findUser(userId);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        List<Reservation> reservations = cinema.getUserReservations(userId);
        return Response.ok(reservations).build();
    }

    /*
    @POST
    @Path("/reservations")
    public Response makeReservatione(ReservationRequest request) {
        try {
            Seance seance = cinema.findSeance(request.getSeanceId());
            Compte user = cinema.findUser(request.getUserId());
            cinema.reserve(seance, user);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                         .entity(e.getMessage())
                         .build();
        }
    }

     */

    @POST
    @Path("/reservations")
    public Response makeReservation(ReservationRequest request) {
        try {
            // Validation des données d'entrée
            if (request == null || request.getSeanceId() <= 0 || request.getUserId() <= 0) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Données de réservation invalides")
                        .build();
            }

            // Récupération de la séance
            Seance seance = cinema.findSeance(request.getSeanceId());
            if (seance == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Séance non trouvée")
                        .build();
            }

            // Récupération de l'utilisateur
            Compte user = cinema.findUser(request.getUserId());
            if (user == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Utilisateur non trouvé")
                        .build();
            }

            // Tentative de réservation
            try {
                cinema.reserve(seance, user);
                return Response.ok()
                        .entity("Réservation effectuée avec succès")
                        .build();
            } catch (PlusDePlaceException e) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Plus de places disponibles")
                        .build();
            } catch (SoldeInsuffisantException e) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Solde insuffisant")
                        .build();
            } catch (SoldeNegatifException e) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Le solde deviendrait négatif")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erreur lors de la réservation: " + e.getMessage())
                    .build();
        }
    }


    
    @GET
    @Path("/salles")
    public Response getAllSalles() {
        Set<SalleProg> salles = cinema.getAllSalleProg();
        return Response.ok(salles).build();
    }
    
    @POST
    @Path("/films")
    public Response createFilm(FilmRequest request) {
        Film film = cinema.createFilm(request.getName());
        return Response.status(Response.Status.CREATED)
                      .entity(film)
                      .build();
    }
    
    @PUT
    @Path("/films/{id}")
    public Response updateFilm(@PathParam("id") int id, Film film) {
        if (id != film.getId()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        cinema.update(film);
        return Response.ok(film).build();
    }
    
    @GET
    @Path("/tarif")
    public Response getTarif() {
        float tarif = cinema.getTarif();
        return Response.ok(tarif).build();
    }

    @GET
    @Path("/seances")
    public Response getAllSeances() {
        List<Seance> seances = cinema.getAllSeances();
        return Response.ok(seances).build();
    }
}
