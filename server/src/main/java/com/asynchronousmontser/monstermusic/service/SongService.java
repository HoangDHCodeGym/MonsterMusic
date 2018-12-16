package com.asynchronousmontser.monstermusic.service;

import com.asynchronousmontser.monstermusic.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface SongService {
    void delete(Integer id);

    Song save(Song song);

    Page<Song> findAll(Pageable pageable);

    List<Song> findAll(Sort sort);

    Song findOne(Integer id);
}
