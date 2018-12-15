package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.Song;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface SongRepository extends PagingAndSortingRepository<Song,Integer> {
}
