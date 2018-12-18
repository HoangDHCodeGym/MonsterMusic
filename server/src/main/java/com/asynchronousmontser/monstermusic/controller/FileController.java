package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/files")
public class FileController {
    private StorageService storageService;

    @Autowired
    public void setUpFileController(StorageService storageService) {
        this.storageService = storageService;
    }

    /**
     * This method handle uploaded file in multipart request.
     * "file" -> 1 File only
     * "files" -> an array of files (multi file)
     * Return code 400 if both of them null or empty.
     * Return code 201 if method store called.
     **/
    @PostMapping
    public ResponseEntity<List<String>> uploadFile(@RequestParam(name = "file", required = false) MultipartFile file,
                                                   @RequestParam(name = "files", required = false) List<MultipartFile> files) {
        List<String> links = new ArrayList<>();
        if (files != null) {
            if (!files.isEmpty()) {
                for (MultipartFile multipartFile : files) {
                    if (!multipartFile.isEmpty()) storageService.store(multipartFile);
                    links.add(multipartFile.getOriginalFilename());
                }
                return new ResponseEntity<>(links, HttpStatus.CREATED);
            }
        }
        if (file != null) {
            if (!file.isEmpty()) {
                storageService.store(file);
                links.add(file.getOriginalFilename());
                return new ResponseEntity<>(links, HttpStatus.CREATED);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{fileName}")
    public ResponseEntity<Void> deleteFile(@PathVariable("fileName") String name) {
        if (Files.exists(storageService.load(name))) {
            storageService.delete(name);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //TODO: not tested yet
    @PutMapping("/{fileName}")
    public ResponseEntity<String> changeFile(@RequestParam(name = "file", required = false) MultipartFile file,
                                             @PathVariable("fileName") String name) {
        if (Files.exists(storageService.load(name))) {
            if (file != null) {
                if (!file.isEmpty()) {
                    storageService.store(file);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            storageService.delete(name);
            return new ResponseEntity<>(file.getOriginalFilename(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //TODO: This is not streaming yet. Write a stream method.
    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> streamFile(@PathVariable("fileName") String name) {
        try {
            Resource media = storageService.loadAsResource(name);
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.parseMediaType("application/octet-stream"))
                    .body(media);
        } catch (Throwable e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
