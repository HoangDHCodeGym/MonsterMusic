package com.asynchronousmontser.monstermusic.service.impl;

import com.asynchronousmontser.monstermusic.model.Song;
import com.asynchronousmontser.monstermusic.repository.SongRepository;
import com.asynchronousmontser.monstermusic.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("songService")
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
    public Song save(Song song) {
        return songRepo.save(song);
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

    //Constrain=======================================================
    @Override
    public Page<Song> findAllSongByPlaylist(Integer id, Pageable pageable) {
        return songRepo.findAllByPlaylist(id, pageable);
    }

    @Override
    public Page<Song> findAllBySinger(Integer id, Pageable pageable) {
        return songRepo.findAllBySinger_Id(id, pageable);
    }

    @Override
    public Page<Song> findAllByCreator(Integer id, Pageable pageable) {
        return songRepo.findAllByCreator_Id(id, pageable);
    }

    @Override
    public Page<Song> findByGene(Integer id, Pageable pageable) {
        return songRepo.findAllByGene_Id(id,pageable);
    }

    //Search========================================
    @Override
    public Page<Song> findByName(String name, Pageable pageable) {
        return songRepo.findAllByNameContains(name,pageable);
    }
}
