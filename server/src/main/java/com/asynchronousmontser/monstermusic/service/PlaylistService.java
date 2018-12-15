package com.asynchronousmontser.monstermusic.service;

import com.asynchronousmontser.monstermusic.model.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;


public interface PlaylistService {
    void delete(Integer id);

    void save(Playlist playlist);

    Page<Playlist> findAll(Pageable pageable);

    List<Playlist> findAll(Sort sort);

    Playlist findOne(Integer id);
}
