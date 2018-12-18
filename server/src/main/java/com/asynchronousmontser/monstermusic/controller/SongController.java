package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.model.Song;
import com.asynchronousmontser.monstermusic.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
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
            return ResponseEntity
                    .ok(song);
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
            song.setId(id);
            for (Method getter : Song.class.getDeclaredMethods()) {
                if (getter.getName().matches("^get\\w+$")) {
                    String fieldName = getter.getName().substring(3);
                    Class<?> returnType = getter.getReturnType();
                    try {
                        Object returnValue = getter.invoke(song);
                        if (returnValue != null) {
                            Method setter = Song.class.getDeclaredMethod("set" + fieldName, returnType);
                            setter.invoke(origin, returnType.cast(returnValue));
                        }
                    } catch (Exception e) {
                        //TODO:continue  and left the value null if exception occur
                        e.printStackTrace();
                    }
                }
            }
            Song updatedOrigin = songService.save(origin);
            return ResponseEntity.ok(updatedOrigin);
        }
        return ResponseEntity.notFound().build();
    }
    //============================================
}
