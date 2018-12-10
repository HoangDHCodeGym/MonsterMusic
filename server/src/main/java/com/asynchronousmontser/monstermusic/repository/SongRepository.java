package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.Song;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(
        collectionResourceRel = "songs",
        itemResourceRel = "song",
        path = "songs"
)
public interface SongRepository extends PagingAndSortingRepository<Song,Integer> {
}
