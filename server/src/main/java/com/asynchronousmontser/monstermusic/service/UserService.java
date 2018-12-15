package com.asynchronousmontser.monstermusic.service;

import com.asynchronousmontser.monstermusic.model.User;
import org.springframework.data.domain.Page;

public interface UserService {
    void delete(Integer id);

    void save(User user);

    Page<User> findAll();

    User findOne(Integer id);
}
