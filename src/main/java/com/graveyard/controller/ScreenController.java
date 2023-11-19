package com.graveyard.controller;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@AllArgsConstructor
public class ScreenController {

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

    @GetMapping(path="/graveSearch")
    public String graveDetails_withMap() {
        return "GraveFilter/filter_page_blank";
    }

    @GetMapping(path="/mapSearch")
    public String mapSearch() {
        return "GraveFilter/MapSearchGrave";
    }

    @GetMapping(path="/map")
    public String showMap(){ return "showmap";}

    @GetMapping(path="/graveDetails_withPosition")
    public String graveDetails_withPosition() {
        return "GraveFilter/graveDetails_withMap";
    }

    @GetMapping(path="/BuriedSearch")
    public String BuriedSearch() {
        return "GraveFilter/filter_page_details_list";
    }


}
