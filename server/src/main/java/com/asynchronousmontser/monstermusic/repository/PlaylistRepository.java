package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.Playlist;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface PlaylistRepository extends PagingAndSortingRepository<Playlist, Integer> {
    @Override
    List<Playlist> findAll();

    @Override
    List<Playlist> findAll(Sort sort);
}
