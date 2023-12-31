package com.graveyard.controller;

import com.graveyard.model_class.dto.GraveDetail;
import com.graveyard.service.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@AllArgsConstructor
public class ScreenController {

    private final GraveService graveService;

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

//    @RequestMapping({"/graveDetails_withPosition"})
//    public String graveDetails_withPosition(@RequestParam(value = "id", required = false) String Dec_id,
//                                            @RequestParam(value = "gid", required = false) String graveyard_id,
//                                            Model model)
//    {
//        List<GraveDetails_ViewModel> Dec_per_detail = decPersonService.getDecPerson_Detail(UUID.fromString(Dec_id));
//        GraveDetails_ViewModel graveDetails_ViewModel;
//        if(!Dec_per_detail.isEmpty()){
//            graveDetails_ViewModel=Dec_per_detail.get(0);
//        }else{
//            graveDetails_ViewModel=new GraveDetails_ViewModel();
//            model.addAttribute("no_data_found",true);
//        }
//        model.addAttribute("data",graveDetails_ViewModel);
//        return "GraveFilter/graveDetails_withMap";
//
//    }

    @RequestMapping({"/graveDetails_withPosition"})
    public String graveDetails_withPosition(@RequestParam(value = "id", required = false) String dec_id,
                                            @RequestParam(value = "gid", required = false) String graveyard_id,
                                            Model model)
    {
        GraveDetail detail = graveService.getGraveDetail(graveyard_id, dec_id);
        model.addAttribute("data",detail);
        return "GraveFilter/graveDetails_withMap";

    }

    @GetMapping(path="/BuriedSearch")
    public String BuriedSearch() {
        return "GraveFilter/filter_page_details_list";
    }


}
