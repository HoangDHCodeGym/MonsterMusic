package com.asynchronousmontser.monstermusic.service;

import com.asynchronousmontser.monstermusic.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface UserService {
    void delete(Integer id);

    void save(User ser);

    Page<User> findAll(Pageable pageable);

    List<User> findAll(Sort sort);

    User findOne(Integer id);
}
