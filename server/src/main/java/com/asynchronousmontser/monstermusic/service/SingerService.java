package com.asynchronousmontser.monstermusic.service;

import com.asynchronousmontser.monstermusic.model.Singer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface SingerService {
    void delete(Integer id);

    Singer save(Singer singer);

    Page<Singer> findAll(Pageable pageable);

    List<Singer> findAll(Sort sort);

    Singer findOne(Integer id);

    //=================================================
    Page<Singer> findAllByCreator(Integer id, Pageable pageable);

    Page<Singer> findByName(String name,Pageable pageable);
}
