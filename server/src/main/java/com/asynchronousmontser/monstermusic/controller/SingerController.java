package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.model.Singer;
import com.asynchronousmontser.monstermusic.service.SingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/singers")
public class SingerController {
    private SingerService singerService;

    @Autowired
    public void setUpSingerController(SingerService singerService) {
        this.singerService = singerService;
    }

    //Basic==================================================
    @GetMapping
    public ResponseEntity<Page<Singer>> getAllSinger(Pageable pageable) {
        Page<Singer> singerList = singerService.findAll(pageable);
        if (singerList.isEmpty()) {
            return ResponseEntity
                    .noContent()
                    .build();
        }
        return ResponseEntity
                .ok(singerList);
    }

    @PostMapping
    public ResponseEntity<Singer> createSinger(@RequestBody Singer singer,
                                                   UriComponentsBuilder uriComponentsBuilder) {
        singerService.save(singer);
        URI uri = uriComponentsBuilder
                .path("/api/singers/{id}")
                .buildAndExpand(singer.getId())
                .toUri();
        return ResponseEntity
                .created(uri)
                .body(singer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Singer> getSinger(@PathVariable("id") Integer id) {
        Singer singer = singerService.findOne(id);
        if (singer != null) {
            return ResponseEntity
                    .ok(singer);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Singer> putUpdateSinger(@RequestBody Singer singer
            , @PathVariable("id") Integer id) {
        if (singerService.findOne(id) != null) {
            singer.setId(id);
            singerService.save(singer);
            return ResponseEntity.ok(singer);
        }
        return ResponseEntity.notFound().build();
    }
    //============================================

}