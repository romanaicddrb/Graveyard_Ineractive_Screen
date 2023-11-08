package com.graveyard.controller;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@AllArgsConstructor
public class ScreenController {

    @GetMapping(path="/")
    public String welcome() {
        return "Welcome";
    }

    @GetMapping(path="/map")
    public String showMap(){ return "showmap";}
}
