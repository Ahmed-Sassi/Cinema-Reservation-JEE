package com.cinema.rest;

import com.cinema.ejb.Utilisateur;


import com.cinema.ejb.UtilisateurBean;
import com.cinema.exceptions.*;
import com.cinema.rest.model.DebitRequest;
import com.cinema.rest.model.LoginRequest;
import com.cinema.rest.model.RegisterRequest;
import com.cinema.entities.*;

import jakarta.ejb.EJB;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    
    @EJB
    private Utilisateur utilisateur;
    
    @POST
    @Path("/login")
    public Response login(LoginRequest request) {
        try {
            utilisateur.init(request.getUsername(), request.getPassword());
            Map<String, Object> response = new HashMap<>();
            response.put("name", utilisateur.getName());
            response.put("solde", utilisateur.solde());
            return Response.ok(response).build();
        } catch (UserNotFoundException e) {
            return Response.status(Response.Status.UNAUTHORIZED)
                         .entity("Invalid credentials")
                         .build();
        } catch (SoldeNegatifException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                         .entity(e.getMessage())
                         .build();
        }
    }


    @POST
    @Path("/register")
    public Response registerUsers(RegisterRequest request) {
        try {
            Compte compte = utilisateur.register(
                    request.getName(),
                    request.getPassword(),
                    request.getSolde()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("name", compte.getName());
            response.put("solde", compte.getSolde());
            return Response.status(Response.Status.CREATED)
                    .entity(response)
                    .build();

        } catch (Exception e) {
            if (e.getMessage().equals("User already exists")) {
                return Response.status(Response.Status.CONFLICT)
                        .entity("User already exists")
                        .build();
            }
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error creating user: " + e.getMessage())
                    .build();
        }
    }
    
    @GET
    @Path("/users/balance")
    public Response getBalance() {
        try {
            float balance = utilisateur.solde();
            return Response.ok(balance).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                         .entity(e.getMessage())
                         .build();
        }
    }
    
    @POST
    @Path("/users/debit")
    public Response debitAccount(DebitRequest request) {
        try {
            utilisateur.debite(request.getAmount());
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                         .entity(e.getMessage())
                         .build();
        }
    }


    @POST
    @Path("/register")
    public Response registerUser(RegisterRequest request) {
        try {
            Compte compte = new Compte();
            compte.setName(request.getName());
            compte.setPassword(request.getPassword());
            compte.setSolde(request.getSolde());
            utilisateur.init(compte.getName(), compte.getPassword());
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                         .entity(e.getMessage())
                         .build();
        }
    }


}
