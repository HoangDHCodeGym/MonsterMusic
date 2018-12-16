package com.asynchronousmontser.monstermusic.service.impl;

import com.asynchronousmontser.monstermusic.model.User;
import com.asynchronousmontser.monstermusic.repository.UserRepository;
import com.asynchronousmontser.monstermusic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {
    private final UserRepository userRepo;

    @Autowired
    public UserServiceImpl(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    //Basic===============================================
    @Override
    public void delete(Integer id) {
        userRepo.deleteById(id);
    }

    @Override
    public User save(User user) {
        return userRepo.save(user);
    }

    @Override
    public Page<User> findAll(Pageable pageable) {
        return userRepo.findAll(pageable);
    }

    @Override
    public List<User> findAll(Sort sort) {
        return userRepo.findAll(sort);
    }

    @Override
    public User findOne(Integer id) {
        return userRepo.findById(id).orElse(null);
    }
}
