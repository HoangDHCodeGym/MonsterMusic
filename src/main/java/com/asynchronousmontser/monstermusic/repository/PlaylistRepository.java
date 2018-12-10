package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.Playlist;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(
        collectionResourceRel = "playlists",
        itemResourceRel = "playlist",
        path = "playlists"
)
public interface PlaylistRepository extends PagingAndSortingRepository<Playlist,Integer> {
}
