package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.Playlist;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@RepositoryRestResource(
        collectionResourceRel = "playlists",
        itemResourceRel = "playlist",
        path = "playlists"
)
public interface PlaylistRepository extends PagingAndSortingRepository<Playlist,Integer> {
}
