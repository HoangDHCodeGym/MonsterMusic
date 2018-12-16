package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.model.Song;
import com.asynchronousmontser.monstermusic.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/songs")
public class SongController {
    private SongService songService;

    @Autowired
    public void setUpSongController(SongService songService) {
        this.songService = songService;
    }

    //Basic==================================================
    @GetMapping
    public ResponseEntity<Page<Song>> getAllSong(Pageable pageable) {
        Page<Song> songList = songService.findAll(pageable);
        if (songList.isEmpty()) {
            return ResponseEntity
                    .noContent()
                    .build();
        }
        return ResponseEntity
                .ok(songList);
    }

    @PostMapping
    public ResponseEntity<Song> createSong(@RequestBody Song song,
                                           UriComponentsBuilder uriComponentsBuilder) {
        songService.save(song);
        URI uri = uriComponentsBuilder
                .path("/api/songs/{id}")
                .buildAndExpand(song.getId())
                .toUri();
        return ResponseEntity
                .created(uri)
                .body(song);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Song> getSong(@PathVariable("id") Integer id) {
        Song song = songService.findOne(id);
        if (song != null) {
            return ResponseEntity
                    .ok(song);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Song> putUpdateSong(@RequestBody Song song
            , @PathVariable("id") Integer id) {
        if (songService.findOne(id) != null) {
            song.setId(id);
            songService.save(song);
            return ResponseEntity.ok(song);
        }
        return ResponseEntity.notFound().build();
    }
    //============================================
}
