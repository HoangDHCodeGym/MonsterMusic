package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.model.*;
import com.asynchronousmontser.monstermusic.model.User;
import com.asynchronousmontser.monstermusic.service.PlaylistService;
import com.asynchronousmontser.monstermusic.service.SingerService;
import com.asynchronousmontser.monstermusic.service.SongService;
import com.asynchronousmontser.monstermusic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.Method;
import java.net.URI;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;
    private SongService songService;
    private PlaylistService playlistService;
    private SingerService singerService;

    @Autowired
    public void setUpUserController(UserService userService,
                                    SongService songService,
                                    SingerService singerService,
                                    PlaylistService playlistService) {
        this.userService = userService;
        this.songService = songService;
        this.playlistService = playlistService;
        this.singerService = singerService;
    }

    //Basic==================================================
    @GetMapping
    public ResponseEntity<Page<User>> getAllUser(Pageable pageable) {
        Page<User> userList = userService.findAll(pageable);
        if (userList.isEmpty()) {
            return ResponseEntity
                    .noContent()
                    .build();
        }
        return ResponseEntity
                .ok(userList);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user,
                                           UriComponentsBuilder uriComponentsBuilder) {
        User savedUser = userService.save(user);
        URI uri = uriComponentsBuilder
                .path("/api/users/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();
        return ResponseEntity
                .created(uri)
                .body(savedUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Integer id) {
        User user = userService.findOne(id);
        if (user != null) {
            return ResponseEntity
                    .ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> putUpdateUser(@RequestBody User user,
                                              @PathVariable("id") Integer id) {
        if (userService.findOne(id) != null) {
            user.setId(id);
            User updatedUser = userService.save(user);
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") Integer id) {
        userService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<User> patchUpdateUser(@PathVariable("id") Integer id,
                                                @RequestBody User user) {
        User origin = userService.findOne(id);
        if (origin != null) {
            user.setId(id);
            for (Method getter : User.class.getDeclaredMethods()) {
                if (getter.getName().matches("^get\\w+$")) {
                    String fieldName = getter.getName().substring(3);
                    Class<?> returnType = getter.getReturnType();
                    try {
                        Object returnValue = getter.invoke(user);
                        if (returnValue != null) {
                            Method setter = User.class.getDeclaredMethod("set" + fieldName, returnType);
                            setter.invoke(origin, returnType.cast(returnValue));
                        }
                    } catch (Exception e) {
                        //TODO:continue  and left the value null if exception occur
                        e.printStackTrace();
                    }
                }
            }
            User updatedOrigin = userService.save(origin);
            return ResponseEntity.ok(updatedOrigin);
        }
        return ResponseEntity.notFound().build();
    }

    //Constrain============================================
    //TODO: remove duplicate code
    @GetMapping("/{id}/songList")
    public ResponseEntity<Page<Song>> getSongList(@PathVariable("id") Integer id,
                                                  Pageable pageable) {
        if (userService.findOne(id) != null) {
            Page<Song> songPage = songService.findAllByCreator(id, pageable);
            return ResponseEntity.ok(songPage);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/playlistList")
    public ResponseEntity<Page<Playlist>> getPlaylistList(@PathVariable("id") Integer id,
                                                          Pageable pageable) {
        if (userService.findOne(id) != null) {
            Page<Playlist> playlistPage = playlistService.findAllByCreator(id, pageable);
            return ResponseEntity.ok(playlistPage);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/singerList")
    public ResponseEntity<Page<Singer>> getSingerList(@PathVariable("id") Integer id,
                                                      Pageable pageable) {
        if (userService.findOne(id) != null) {
            Page<Singer> singerPage = singerService.findAllByCreator(id, pageable);
            return ResponseEntity.ok(singerPage);
        }
        return ResponseEntity.notFound().build();
    }
}
