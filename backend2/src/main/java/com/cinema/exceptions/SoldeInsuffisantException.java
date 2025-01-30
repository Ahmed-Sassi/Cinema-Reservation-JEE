package com.cinema.exceptions;

public class SoldeInsuffisantException extends Exception {
    private static final long serialVersionUID = 1L;
    
    public SoldeInsuffisantException() {
        super("Insufficient balance in account");
    }
}
