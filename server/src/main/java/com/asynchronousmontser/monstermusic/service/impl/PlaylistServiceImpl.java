package com.asynchronousmontser.monstermusic.service.impl;

import com.asynchronousmontser.monstermusic.model.Playlist;
import com.asynchronousmontser.monstermusic.repository.PlaylistRepository;
import com.asynchronousmontser.monstermusic.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("playListService")
public class PlaylistServiceImpl implements PlaylistService {

    private final PlaylistRepository playlistRepo;

    @Autowired
    public PlaylistServiceImpl(PlaylistRepository playlistRepo) {
        this.playlistRepo = playlistRepo;
    }

    //Basic===============================================
    @Override
    public void delete(Integer id) {
        playlistRepo.deleteById(id);
    }

    @Override
    public void save(Playlist playlist) {
        playlistRepo.save(playlist);
    }

    @Override
    public Page<Playlist> findAll(Pageable pageable) {
        return playlistRepo.findAll(pageable);
    }

    @Override
    public List<Playlist> findAll(Sort sort) {
        return playlistRepo.findAll(sort);
    }

    @Override
    public Playlist findOne(Integer id) {
        return playlistRepo.findById(id).orElse(null);
    }
    //=======================================================
}
