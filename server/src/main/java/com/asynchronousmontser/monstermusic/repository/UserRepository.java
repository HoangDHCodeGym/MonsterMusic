package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@RepositoryRestResource(
        collectionResourceRel = "users",
        itemResourceRel = "user",
        path = "users"
)
public interface UserRepository extends PagingAndSortingRepository<User, Integer> {
}
