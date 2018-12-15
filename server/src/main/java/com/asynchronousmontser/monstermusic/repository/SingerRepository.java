package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.Singer;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

public interface SingerRepository extends PagingAndSortingRepository<Singer, Integer> {
}
