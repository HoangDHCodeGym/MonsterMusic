package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.Playlist;
import com.asynchronousmontser.monstermusic.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlaylistRepository extends PagingAndSortingRepository<Playlist, Integer> {
    @Override
    List<Playlist> findAll();

    @Override
    List<Playlist> findAll(Sort sort);

    //==================================================
    Page<Playlist> findAllByCreator_Id(Integer id, Pageable pageable);
    Page<Playlist> findAllByNameContains(String name,Pageable pageable);

}
