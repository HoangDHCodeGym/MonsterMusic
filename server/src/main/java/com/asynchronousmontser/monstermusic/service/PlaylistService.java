package com.asynchronousmontser.monstermusic.service;

import com.asynchronousmontser.monstermusic.model.Playlist;
import org.springframework.data.domain.Page;


public interface PlaylistService {
    void delete(Integer id);

    void save(Playlist playlist);

    Page<Playlist> findAll();

    Playlist findOne(Integer id);
}
