package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.Singer;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(
        collectionResourceRel = "singers",
        itemResourceRel = "singer",
        path = "singers"
)
public interface SingerRepository extends PagingAndSortingRepository<Singer, Integer> {
}
