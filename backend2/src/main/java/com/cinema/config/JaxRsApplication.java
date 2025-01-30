package com.cinema.config;

import jakarta.ws.rs.ApplicationPath;

import jakarta.ws.rs.core.Application;

@ApplicationPath("/api")
public class JaxRsApplication extends Application {
    // The empty class is sufficient for JAX-RS to work
}
