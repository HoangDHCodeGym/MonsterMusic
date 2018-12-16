package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.model.Playlist;
import com.asynchronousmontser.monstermusic.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/playlists")
public class PlaylistController {
    private PlaylistService playlistService;

    @Autowired
    public void setUpPlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    //Basic==================================================
    @GetMapping
    public ResponseEntity<Page<Playlist>> getAllPlaylist(Pageable pageable) {
        Page<Playlist> playlistList = playlistService.findAll(pageable);
        if (playlistList.isEmpty()) {
            return ResponseEntity
                    .noContent()
                    .build();
        }
        return ResponseEntity
                .ok(playlistList);
    }

    @PostMapping
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist,
                                                   UriComponentsBuilder uriComponentsBuilder) {
        Playlist savedPlaylist = playlistService.save(playlist);
        URI uri = uriComponentsBuilder
                .path("/api/playlists/{id}")
                .buildAndExpand(savedPlaylist.getId())
                .toUri();
        return ResponseEntity
                .created(uri)
                .body(savedPlaylist);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Playlist> getPlaylist(@PathVariable("id") Integer id) {
        Playlist playlist = playlistService.findOne(id);
        if (playlist != null) {
            return ResponseEntity
                    .ok(playlist);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Playlist> putUpdatePlaylist(@RequestBody Playlist playlist
            , @PathVariable("id") Integer id) {
        if (playlistService.findOne(id) != null) {
            playlist.setId(id);
            Playlist updatedPlaylist = playlistService.save(playlist);
            return ResponseEntity.ok(updatedPlaylist);
        }
        return ResponseEntity.notFound().build();
    }
    //============================================

}
