package com.graveyard.controller;

import com.graveyard.model_class.dto.DeathSearchDto;
import com.graveyard.model_class.entity.DeathSearch_Viewmodel;
import com.graveyard.service.DeathSearchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.StringUtils;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class APIController {

    private final DeathSearchService deathSearchService;

    public APIController(DeathSearchService deathSearchService) {
        this.deathSearchService = deathSearchService;
    }

    @PostMapping(path = "/search")
    public ResponseEntity<List<DeathSearch_Viewmodel>> search(DeathSearchDto object) {
        return new ResponseEntity<>(deathSearchService.getDeathBySearchTextAll(object), HttpStatus.OK);
    }

}
