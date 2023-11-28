package com.graveyard.controller;

import com.graveyard.model_class.dto.GraveDetail;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;


import java.util.UUID;

@Controller
@AllArgsConstructor
public class ScreenController {
    private final RestTemplate restTemplate;

    @Autowired
    public ScreenController(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @GetMapping(path="/")
    public String welcome() {
        return "GraveFilter/HomeScreen";
    }


    @GetMapping(path="/filter_page_blank")
    public String filter_page_blank() {
        return "GraveFilter/filter_page_blank";
    }

    @GetMapping(path="/filter_page_details_list")
    public String filter_page_details_list() {
        return "GraveFilter/filter_page_details_list";
    }

    // Search Grave By Memo and other filters
    @GetMapping(path="/graveSearch")
    public String graveSearchWithFilter() {
        return "GraveFilter/graveSearchWithFilter";
    }

    @GetMapping(path="/mapSearch")
    public String mapSearch() {
        String apiUrl = "http://localhost:8080/api/getGraveAvailApi/2";
        return "GraveFilter/MapSearchGrave";
    }

    @GetMapping(path="/map")
    public String showMap(){ return "showmap";}


    @GetMapping(path="/graveDetails_withPosition")
    public String graveDetails_withPosition(
            @RequestParam(name = "id") UUID decId,
            @RequestParam(name = "gid") String gid,
            Model model
    ) {
        String apiUrl = "http://localhost:8080/api/detail/" + gid + "/" + decId;
//        GraveDetail graveDetail = restTemplate.getForObject(apiUrl, GraveDetail.class);
//
//        // Check if the object is not null
//        if (graveDetail != null) {
//            model.addAttribute("graveDetail", graveDetail);
//        } else {
//            // Handle the case when the API call is not successful
//            // You might want to add error handling logic here
//        }

        return "GraveFilter/graveDetails_withMap";

    }

    @GetMapping(path="/BuriedSearch")
    public String BuriedSearch() {
        return "GraveFilter/filter_page_details_list";
    }


}
