package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
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
                                                   @RequestParam(name = "files", required = false) List<MultipartFile> files,
                                                   UriComponentsBuilder uriComponentsBuilder) {
        List<String> links = new ArrayList<>();
        if (files != null) {
            if (!files.isEmpty()) {
                for (MultipartFile multipartFile : files) {
                    if (!multipartFile.isEmpty()) storageService.store(multipartFile);
                    links.add(multipartFile.getOriginalFilename());
                }
                //not have specific location.
                return ResponseEntity.created(null).body(links);
            }
        }
        if (file != null) {
            if (!file.isEmpty()) {
                storageService.store(file);
                links.add(file.getOriginalFilename());
                URI uri = uriComponentsBuilder
                        .path("/api/files/{fileName}")
                        .buildAndExpand(file.getOriginalFilename())
                        .toUri();
                return ResponseEntity.created(uri).body(links);
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{fileName}")
    public ResponseEntity<Void> deleteFile(@PathVariable("fileName") String name) {
        if (Files.exists(storageService.load(name))) {
            storageService.delete(name);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    //TODO: check uri.
    @PutMapping("/{fileName}")
    public ResponseEntity<String> changeFile(@RequestParam(name = "file", required = false) MultipartFile file,
                                             @PathVariable("fileName") String name,
                                             UriComponentsBuilder uriComponentsBuilder) {
        if (Files.exists(storageService.load(name))) {
            if (file != null) {
                if (!file.isEmpty()) {
                    storageService.store(file);
                }
            } else {
                return ResponseEntity.badRequest().build();
            }
            String uri = uriComponentsBuilder
                    .path("/api/files/{fileName}")
                    .buildAndExpand(file.getOriginalFilename())
                    .toUriString();
            storageService.delete(name);
            return ResponseEntity.ok()
                    .header("location", uri)
                    .body(file.getOriginalFilename());
        }
        return ResponseEntity.notFound().build();
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
            return ResponseEntity.notFound().build();
        }
    }
}
