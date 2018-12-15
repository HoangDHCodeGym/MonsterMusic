package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<User, Integer> {
}
