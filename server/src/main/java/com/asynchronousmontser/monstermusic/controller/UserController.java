package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.model.User;
import com.asynchronousmontser.monstermusic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;

    @Autowired
    public void setUpUserController(UserService userService) {
        this.userService = userService;
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
    public ResponseEntity<User> putUpdateUser(@RequestBody User user
            , @PathVariable("id") Integer id) {
        if (userService.findOne(id) != null) {
            user.setId(id);
            User updatedUser = userService.save(user);
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }
    //============================================
}
