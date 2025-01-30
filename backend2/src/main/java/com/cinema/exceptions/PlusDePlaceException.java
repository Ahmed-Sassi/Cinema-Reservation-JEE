package com.cinema.exceptions;

public class PlusDePlaceException extends Exception {
    private static final long serialVersionUID = 1L;
    
    public PlusDePlaceException() {
        super("No more seats available for this seance");
    }
}
