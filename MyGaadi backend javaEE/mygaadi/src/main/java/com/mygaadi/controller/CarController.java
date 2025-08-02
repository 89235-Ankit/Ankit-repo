package com.mygaadi.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mygaadi.dto.CarFilterDTO;
import com.mygaadi.dto.CarRequestDTO;
import com.mygaadi.dto.CarResponseDTO;
import com.mygaadi.service.CarService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/cars")

public class CarController {

    @Autowired
    private CarService carService;
    
    @Autowired
    private ObjectMapper objectmapper;

    @PostMapping("/add")
    public ResponseEntity<?> addCarImage(@RequestParam("images") MultipartFile[] images, @RequestParam("car") String fileData) throws IOException {
        
    	CarRequestDTO dto = objectmapper.readValue(fileData, CarRequestDTO.class);
    	System.out.println(dto.toString());
       for (MultipartFile multipartFile : images) {
    	   System.out.println(multipartFile.getOriginalFilename());
	}
      
        return ResponseEntity.ok(carService.addCar(dto, images));
    }
    
    
    @GetMapping("/all")
    public ResponseEntity<List<CarResponseDTO>> getAllCars() {
        List<CarResponseDTO> allCars = carService.getAllCars();
        return ResponseEntity.ok(allCars);
    }
    
    @PostMapping("/filter")
    public ResponseEntity<List<CarResponseDTO>> filterCars(@RequestBody CarFilterDTO filter) {
        return ResponseEntity.ok(carService.filterCars(filter));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CarResponseDTO> getCarById(@PathVariable Long id) {
        CarResponseDTO response = carService.getCarById(id);
        return ResponseEntity.ok(response);
    }


}
