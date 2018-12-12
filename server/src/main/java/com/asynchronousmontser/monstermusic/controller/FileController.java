package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
     * file -> 1 File only
     * files -> an array of files (multi file)
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
                    links.add(multipartFile.getName());
                }
                return new ResponseEntity<>(links, HttpStatus.CREATED);
            }
        }
        if (file != null) {
            if (!file.isEmpty()) {
                storageService.store(file);
                links.add(file.getName());
                return new ResponseEntity<>(links, HttpStatus.CREATED);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{fileName}")
    public ResponseEntity<Void> deleteFile(@PathVariable("fileName") String name) {
        storageService.delete(name);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
