package com.cinema.rest.model;


import jakarta.json.bind.annotation.JsonbProperty;

public class RegisterRequest {
    @JsonbProperty("name")
    private String name;
    @JsonbProperty("password")
    private String password;
    @JsonbProperty("solde")
    private float solde;
    
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
}
