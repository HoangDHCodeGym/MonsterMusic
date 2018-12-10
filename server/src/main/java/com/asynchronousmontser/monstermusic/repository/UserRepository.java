package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(
        collectionResourceRel = "users",
        itemResourceRel = "user",
        path = "users"
)
public interface UserRepository extends PagingAndSortingRepository<User, Integer> {
}
