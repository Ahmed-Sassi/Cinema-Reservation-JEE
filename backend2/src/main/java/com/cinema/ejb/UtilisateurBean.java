package com.cinema.ejb;

import com.cinema.entities.Compte;

import com.cinema.exceptions.*;
import jakarta.ejb.Stateful;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import java.util.List;

@Stateful
public class UtilisateurBean implements Utilisateur {
    
    @PersistenceContext
    private EntityManager em;
    
    private int userId;
    
    @Override
    public void init(String name, String passwd) throws UserNotFoundException {
        TypedQuery<Compte> query = em.createNamedQuery("findCompteByName", Compte.class);
        query.setParameter("cname", name);
        List<Compte> results = query.getResultList();
        
        if (results.isEmpty()) {
            throw new UserNotFoundException();
        }
        
        Compte compte = results.get(0);
        if (compte.getName().equals(name) && compte.getPassword().equals(passwd)) {
            userId = compte.getId();
        } else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public Compte register(String name, String password, float solde) throws Exception {
        TypedQuery<Compte> query = em.createNamedQuery("findCompteByName", Compte.class);
        query.setParameter("cname", name);
        if (!query.getResultList().isEmpty()) {
            throw new Exception("User already exists");
        }

        Compte compte = new Compte();
        compte.setName(name);
        compte.setPassword(password);
        compte.setSolde(solde);

        em.persist(compte);
        return compte;
    }
    
    @Override
    public String getName() throws UserNotFoundException {
        Compte compte = getCompte();
        return compte.getName();
    }
    
    @Override
    public float solde() throws SoldeNegatifException, UserNotFoundException {
        Compte compte = getCompte();
        float balance = compte.getSolde();
        if (balance < 0) {
            throw new SoldeNegatifException();
        }
        return balance;
    }
    
    @Override
    public void debite(float amount) throws SoldeNegatifException, UserNotFoundException {
        Compte compte = getCompte();
        float newBalance = compte.getSolde() - amount;
        
        if (newBalance < 0) {
            throw new SoldeNegatifException();
        }
        
        compte.setSolde(newBalance);
        em.merge(compte);
    }
    
    private Compte getCompte() throws UserNotFoundException {
        Compte compte = em.find(Compte.class, userId);
        if (compte == null) {
            throw new UserNotFoundException();
        }
        return compte;
    }
}
