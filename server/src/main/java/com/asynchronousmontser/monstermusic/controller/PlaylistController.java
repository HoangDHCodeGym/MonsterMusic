package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.model.Playlist;
import com.asynchronousmontser.monstermusic.model.Song;
import com.asynchronousmontser.monstermusic.service.PlaylistService;
import com.asynchronousmontser.monstermusic.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.Method;
import java.net.URI;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/playlists")
public class PlaylistController {
    private PlaylistService playlistService;
    private SongService songService;

    @Autowired
    public void setUpPlaylistController(PlaylistService playlistService,
                                        SongService songService) {
        this.playlistService = playlistService;
        this.songService = songService;
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
            playlist.setViews((playlist.getViews() + 1));
            Playlist viewedPlaylist = playlistService.save(playlist);
            return ResponseEntity
                    .ok(viewedPlaylist);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Playlist> putUpdatePlaylist(@RequestBody Playlist playlist,
                                                      @PathVariable("id") Integer id) {
        if (playlistService.findOne(id) != null) {
            playlist.setId(id);
            Playlist updatedPlaylist = playlistService.save(playlist);
            return ResponseEntity.ok(updatedPlaylist);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Playlist> deleteUser(@PathVariable("id") Integer id) {
        playlistService.delete(id);
        return ResponseEntity.ok().build();
    }

    //TODO this patch cannot handle list.
    @PatchMapping("/{id}")
    public ResponseEntity<Playlist> patchUpdatePlaylist(@PathVariable("id") Integer id,
                                                        @RequestBody Playlist playlist) {
        Playlist origin = playlistService.findOne(id);
        if (origin != null) {
            playlist.setId(id);
            for (Method getter : Playlist.class.getDeclaredMethods()) {
                if (getter.getName().matches("^get\\w+$")) {
                    String fieldName = getter.getName().substring(3);
                    Class<?> returnType = getter.getReturnType();
                    try {
                        Object returnValue = getter.invoke(playlist);
                        if (returnValue != null) {
                            Method setter = Playlist.class.getDeclaredMethod("set" + fieldName, returnType);
                            setter.invoke(origin, returnType.cast(returnValue));
                        }
                    } catch (Exception e) {
                        //TODO:continue  and left the value null if exception occur
                        e.printStackTrace();
                    }
                }
            }
            Playlist updatedOrigin = playlistService.save(origin);
            return ResponseEntity.ok(updatedOrigin);
        }
        return ResponseEntity.notFound().build();
    }

    //Constrain============================================
    //TODO: this shit have unidirectional relationship error.
    @GetMapping("/{id}/songList")
    public ResponseEntity<Page<Song>> getSongList(@PathVariable("id") Integer id,
                                                  Pageable pageable) {
        Playlist playlist = playlistService.findOne(id);
        if (playlist != null) {
            Page<Song> songPage = songService.findAllSongByPlaylist(id, pageable);
            return ResponseEntity.ok(songPage);
        }
        return ResponseEntity.notFound().build();
    }
}
