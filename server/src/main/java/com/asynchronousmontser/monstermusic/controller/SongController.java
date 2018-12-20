package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.model.Song;
import com.asynchronousmontser.monstermusic.service.SongService;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.URI;

@CrossOrigin("http://localhost:4200")
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
        Song savedSong = songService.save(song);
        URI uri = uriComponentsBuilder
                .path("/api/songs/{id}")
                .buildAndExpand(savedSong.getId())
                .toUri();
        return ResponseEntity
                .created(uri)
                .body(savedSong);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Song> getSong(@PathVariable("id") Integer id) {
        Song song = songService.findOne(id);
        if (song != null) {
            song.setViews((song.getViews() + 1));
            Song viewedSong = songService.save(song);
            return ResponseEntity
                    .ok(viewedSong);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Song> putUpdateSong(@RequestBody Song song,
                                              @PathVariable("id") Integer id) {
        if (songService.findOne(id) != null) {
            song.setId(id);
            Song updatedSong = songService.save(song);
            return ResponseEntity.ok(updatedSong);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Song> deleteSong(@PathVariable("id") Integer id) {
        songService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Song> patchUpdateSong(@PathVariable("id") Integer id,
                                                @RequestBody Song song) {
        Song origin = songService.findOne(id);
        if (origin != null) {
            Song patchedOrigin = PatchHandler.patch(song, origin);
            patchedOrigin.setId(id);
            patchedOrigin.setPlaylistList(
                    PatchHandler.patchList(origin.getPlaylistList(),
                            song.getPlaylistList())
            );
            patchedOrigin = songService.save(patchedOrigin);
            return ResponseEntity.ok(patchedOrigin);
        }
        return ResponseEntity.notFound().build();
    }

    //Search=======================================
    @GetMapping("/search/name")
    public ResponseEntity<Page<Song>> findByName(@RequestParam("q") String query,
                                                 Pageable pageable) {
        Page<Song> songPage = songService.findByName(query, pageable);
        return getPageResponseEntity(songPage);
    }

    @GetMapping("/search/gene")
    public ResponseEntity<Page<Song>> findByGene(@RequestParam("q") String query,
                                                 Pageable pageable) {
        Integer queryId = Integer.parseInt(query);
        Page<Song> songPage = songService.findByGene(queryId, pageable);
        return getPageResponseEntity(songPage);
    }

    private ResponseEntity<Page<Song>> getPageResponseEntity(Page<Song> songPage) {
        if (songPage != null) {
            if (songPage.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(songPage);
        }
        return ResponseEntity.notFound().build();
    }
}
