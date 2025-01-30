package com.cinema.rest.model;

public class ReservationRequest {
    private int seanceId;
    private int userId;
    
    public int getSeanceId() {
        return seanceId;
    }
    
    public void setSeanceId(int seanceId) {
        this.seanceId = seanceId;
    }
    
    public int getUserId() {
        return userId;
    }
    
    public void setUserId(int userId) {
        this.userId = userId;
    }
}
