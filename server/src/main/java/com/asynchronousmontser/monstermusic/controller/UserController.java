package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.model.User;
import com.asynchronousmontser.monstermusic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sample")
public class UserController {

    @Autowired
    private UserService userService;

//    @RequestMapping(value="/user", method = RequestMethod.GET)
    @GetMapping(value = "/alluser")
    public List<User> listUser(){
        return userService.findAll();
    }

//    @RequestMapping(value = "/user", method = RequestMethod.POST)
    @PostMapping(value = "/adduser")
    public User create(@RequestBody User user){
        return userService.save(user);
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable(value = "id") Integer id){
        userService.delete(id);
        return "success";
    }

    @RequestMapping(value = "/name/{username}", method = RequestMethod.POST)
    public User findUserName(@PathVariable(value = "username") String username) {
        System.out.println(userService.findByUsername("admin"));
        return userService.findByUsername(username);
    }

}
