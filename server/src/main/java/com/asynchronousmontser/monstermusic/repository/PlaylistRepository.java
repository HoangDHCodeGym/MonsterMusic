package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.Playlist;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PlaylistRepository extends PagingAndSortingRepository<Playlist,Integer> {
}
