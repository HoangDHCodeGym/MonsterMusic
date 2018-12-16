package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface UserRepository extends PagingAndSortingRepository<User, Integer> {
    @Override
    List<User> findAll();

    @Override
    List<User> findAll(Sort sort);
}
