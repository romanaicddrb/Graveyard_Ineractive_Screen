package com.graveyard.controller;

import com.graveyard.model_class.dto.*;
import com.graveyard.model_class.dto.DataTableDto.DataTable;
import com.graveyard.model_class.dto.DataTableDto.DataTableRequestDto;
import com.graveyard.model_class.dto.DeathListDto;
import com.graveyard.model_class.dto.GraveDetail;
import com.graveyard.service.GraveService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class APIController {

    @Value("${api.baseurl}")
    private String baseUrl;

    private final GraveService graveService;

    public APIController(GraveService graveService) {
        this.graveService = graveService;
    }

    @PostMapping(path = "/search", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DataTable<DeathListDto>> search(@RequestBody DataTableRequestDto object) {
        return new ResponseEntity<>(graveService.getBySearch(object), HttpStatus.OK);
    }

    @GetMapping(value = "/detail/{gId}/{id}")
    public ResponseEntity<GraveDetail> detail(@PathVariable("gId") String gId,
                                              @PathVariable("id") String id) {
        return new ResponseEntity<>(graveService.getGraveDetail(gId, id), HttpStatus.OK);
    }

    @GetMapping(value = "/getGraveAvailApi/{gid}")
    public ResponseEntity<List<GraveMapDetail>> getMapDetail(@PathVariable("gid") int gid) {
        return new ResponseEntity<>(graveService.getGraveMapDetail(gid), HttpStatus.OK);
    }

}
