package com.cinema.ejb;

import com.cinema.entities.Compte;
import com.cinema.exceptions.*;

import jakarta.ejb.Remote;

@Remote
public interface Utilisateur {
    // Initialize user bank account (authentication)
    void init(String name, String passwd) throws UserNotFoundException;
    
    // Get user name
    String getName() throws UserNotFoundException;
    
    // Get account balance
    float solde() throws SoldeNegatifException, UserNotFoundException;
    
    // Debit user account
    void debite(float amount) throws SoldeNegatifException, UserNotFoundException;

    Compte register(String name, String password, float solde) throws Exception;
}
