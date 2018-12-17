package com.asynchronousmontser.monstermusic.repository;

import com.asynchronousmontser.monstermusic.model.Singer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface SingerRepository extends PagingAndSortingRepository<Singer, Integer> {
    @Override
    List<Singer> findAll();

    @Override
    List<Singer> findAll(Sort sort);

    //========================================================
    Page<Singer> findAllByCreator_Id(Integer id, Pageable pageable);
}
