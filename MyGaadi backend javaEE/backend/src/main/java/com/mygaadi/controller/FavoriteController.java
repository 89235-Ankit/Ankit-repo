package com.mygaadi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mygaadi.dto.CarResponseDTO;
import com.mygaadi.security.JwtUtil;
import com.mygaadi.service.CarService;
import com.mygaadi.service.FavoriteService;
import com.mygaadi.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
	
	@Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private CarService carService;

    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired 
    private FavoriteService favoriteService;

    @GetMapping("/")
    public ResponseEntity<List<CarResponseDTO>> get(@RequestHeader("Authorization") String authHeader){
    	  String token = authHeader.substring(7);
          String email = jwtUtil.extractEmail(token);
          Long sellerId = userService.getUserByEmail(email).getId();
        return ResponseEntity.ok(favoriteService.getUserFavorites(sellerId));
    }

    @PostMapping("/{userId}/{carId}")
    public ResponseEntity<Void> add(@PathVariable Long userId, @PathVariable Long carId) {
        favoriteService.addFavorite(userId, carId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{carId}")
    public ResponseEntity<Void> remove(@RequestHeader("Authorization") String authHeader, @PathVariable Long carId) {
    	String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        Long sellerId = userService.getUserByEmail(email).getId();
        favoriteService.removeFavorite(sellerId, carId);
        return ResponseEntity.noContent().build();
    }
}
