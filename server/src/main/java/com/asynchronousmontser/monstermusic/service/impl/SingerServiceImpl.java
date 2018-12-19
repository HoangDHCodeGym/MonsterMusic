package com.asynchronousmontser.monstermusic.service.impl;

import com.asynchronousmontser.monstermusic.model.Singer;
import com.asynchronousmontser.monstermusic.repository.SingerRepository;
import com.asynchronousmontser.monstermusic.service.SingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("singerService")
public class SingerServiceImpl implements SingerService {
    private final SingerRepository singerRepo;

    @Autowired
    public SingerServiceImpl(SingerRepository singerRepo) {
        this.singerRepo = singerRepo;
    }

    //Basic===============================================
    @Override
    public void delete(Integer id) {
        singerRepo.deleteById(id);
    }

    @Override
    public Singer save(Singer singer) {
        return singerRepo.save(singer);
    }

    @Override
    public Page<Singer> findAll(Pageable pageable) {
        return singerRepo.findAll(pageable);
    }

    @Override
    public List<Singer> findAll(Sort sort) {
        return singerRepo.findAll(sort);
    }

    @Override
    public Singer findOne(Integer id) {
        return singerRepo.findById(id).orElse(null);
    }

    //======================================================
    @Override
    public Page<Singer> findAllByCreator(Integer id, Pageable pageable) {
        return singerRepo.findAllByCreator_Id(id,pageable);
    }
}
