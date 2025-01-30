package com.cinema.exceptions;

public class SoldeNegatifException extends Exception {
    private static final long serialVersionUID = 1L;
    
    public SoldeNegatifException() {
        super("Account balance cannot be negative");
    }
}
