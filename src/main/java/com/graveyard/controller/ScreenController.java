package com.graveyard.controller;

import com.graveyard.model_class.viewmodel.GraveAvailable_ViewModel;
import com.graveyard.model_class.viewmodel.GraveDetails_ViewModel;
import com.graveyard.service.DecPersonService;
import com.graveyard.service.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

@Controller
@AllArgsConstructor
public class ScreenController {
//    private final RestTemplate restTemplate;
    private DecPersonService decPersonService;
    private GraveAvailable graveAvailable;

//    @Autowired
//    public ScreenController(RestTemplateBuilder restTemplateBuilder) {
//        this.restTemplate = restTemplateBuilder.build();
//    }

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
    public String mapSearch(Model model) {

//        List<GraveAvailable_ViewModel> Grave_availability = graveAvailable.getGraveAvailable(2);
//        model.addAttribute("data",Grave_availability);

        return "GraveFilter/MapSearchGrave";
    }

    @GetMapping(path="/map")
    public String showMap(){ return "showmap";}


//    @GetMapping(path="/graveDetails_withPosition")
//    public String graveDetails_withPosition(
//            @RequestParam(name = "id") UUID decId,
//            @RequestParam(name = "gid") String gid,
//            Model model
//    ) {
//        String apiUrl = "http://localhost:8080/api/detail?gId=" + gid + "&id=" + decId;
//        GraveDetail graveDetail = restTemplate.getForObject(apiUrl, GraveDetail.class);
//
//        // Check if the object is not null
//        if (graveDetail != null) {
//            model.addAttribute("graveDetail", graveDetail);
//        } else {
//            model.addAttribute("error", "Failed to retrieve details. Please try again.");
//        }
//
//        return "GraveFilter/graveDetails_withMap";
//
//    }

    @RequestMapping({"/graveDetails_withPosition"})
    public String graveDetails_withPosition(@RequestParam(value = "id", required = false) String Dec_id,
                                            @RequestParam(value = "gid", required = false) String graveyard_id,
                                            Model model
                                            ) throws ParseException
//    @RequestParam (value="Dec_id", required = false) String Dec_id,
    {
        List<GraveDetails_ViewModel> Dec_per_detail = decPersonService.getDecPerson_Detail(UUID.fromString(Dec_id));
        GraveDetails_ViewModel graveDetails_ViewModel;
        if(!Dec_per_detail.isEmpty()){
            graveDetails_ViewModel=Dec_per_detail.get(0);
        }else{
            graveDetails_ViewModel=new GraveDetails_ViewModel();
            model.addAttribute("no_data_found",true);
        }

        SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd");
//        SimpleDateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy");
        Date date = null;
        Date date1 = null;
        try {
            date = inputFormat.parse(graveDetails_ViewModel.Bur_date);
            date1 = inputFormat.parse(graveDetails_ViewModel.Dod);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
//        String curr_date = outputFormat.format(date);

        String curr =new SimpleDateFormat("dd/MM/yyyy").format(date);
        String curr_Dod =new SimpleDateFormat("dd/MM/yyyy").format(date1);
        Date curr_date =new SimpleDateFormat("dd/MM/yyyy").parse(curr);
        Date curr_date_Dod =new SimpleDateFormat("dd/MM/yyyy").parse(curr_Dod);
//        Date curr_date = String.valueOf(curr);

        model.addAttribute("data",graveDetails_ViewModel);
        model.addAttribute("burdate",curr_date);
        model.addAttribute("Doddate",curr_date_Dod);
        return "GraveFilter/graveDetails_withMap";

    }

    @GetMapping(path="/BuriedSearch")
    public String BuriedSearch() {
        return "GraveFilter/filter_page_details_list";
    }


}
