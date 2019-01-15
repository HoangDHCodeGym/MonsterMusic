package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SongRepository extends PagingAndSortingRepository<Song, Integer> {
    @Override
    List<Song> findAll();

    @Override
    List<Song> findAll(Sort sort);

    //Constrain===============================================================
    @Query("select s from Song s join s.playlistList p where p.id =:id")
    Page<Song> findAllByPlaylist(@Param("id") Integer id, Pageable pageable);

    Page<Song> findAllBySinger_Id(Integer id, Pageable pageable);

    Page<Song> findAllByCreator_Id(Integer id, Pageable pageable);

    Page<Song> findAllByGene_Id(Integer id, Pageable pageable);

    //Search========================================
    Page<Song> findAllByNameContains(String name, Pageable pageable);
}
