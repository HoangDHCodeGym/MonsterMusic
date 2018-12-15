package com.asynchronousmontser.monstermusic.service.impl;

import com.asynchronousmontser.monstermusic.model.Song;
import com.asynchronousmontser.monstermusic.repository.SongRepository;
import com.asynchronousmontser.monstermusic.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public class SongServiceImpl implements SongService {
    private final SongRepository songRepo;

    @Autowired
    public SongServiceImpl(SongRepository songRepo) {
        this.songRepo = songRepo;
    }

    //Basic===============================================
    @Override
    public void delete(Integer id) {
        songRepo.deleteById(id);
    }

    @Override
    public void save(Song song) {
        songRepo.save(song);
    }

    @Override
    public Page<Song> findAll(Pageable pageable) {
        return songRepo.findAll(pageable);
    }

    @Override
    public List<Song> findAll(Sort sort) {
        return songRepo.findAll(sort);
    }

    @Override
    public Song findOne(Integer id) {
        return songRepo.findById(id).orElse(null);
    }
    //=======================================================
}
