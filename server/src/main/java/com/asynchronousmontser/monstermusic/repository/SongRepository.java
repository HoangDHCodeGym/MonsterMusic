package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.Song;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface SongRepository extends PagingAndSortingRepository<Song, Integer> {
    @Override
    List<Song> findAll();

    @Override
    List<Song> findAll(Sort sort);
}
