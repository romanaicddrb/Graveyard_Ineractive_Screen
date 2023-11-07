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

    @GetMapping(path="/filter_page_blank")
    public String filter_page_blank() {
        return "GraveFilter/filter_page_blank";
    }
}
