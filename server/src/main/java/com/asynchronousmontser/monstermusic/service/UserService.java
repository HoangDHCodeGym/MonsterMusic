package com.asynchronousmontser.monstermusic.service;

import com.asynchronousmontser.monstermusic.model.User;

import java.util.List;

public interface UserService {
    User save(User user);
    List<User> findAll();
    void delete(Integer id);
}
