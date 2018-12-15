package com.asynchronousmontser.monstermusic.service;

import com.asynchronousmontser.monstermusic.model.Singer;
import org.springframework.data.domain.Page;

public interface SingerService {
    void delete(Integer id);

    void save(Singer singer);

    Page<Singer> findAll();

    Singer findOne(Integer id);
}
