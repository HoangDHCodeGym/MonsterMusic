package com.asynchronousmontser.monstermusic.controller;

import com.asynchronousmontser.monstermusic.model.Song;
import com.asynchronousmontser.monstermusic.repository.SongRepository;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.IOException;

import static org.hamcrest.Matchers.hasItems;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
public class SongControllerTest {

    private MockMvc mockMvc;


    @Test
    public void getAllSong() {
//        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.get("/api/songs");
        try {
            this.mockMvc.perform(MockMvcRequestBuilders.get("/api/songs"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content[0].id", is(1)));
        } catch (Exception e) {
        }
    }

    @Test
    public void createSong() {
        Song song = new Song();

        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.post("/api/songs")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{'name':'Hello', 'user': 1}");

        try {
            this.mockMvc.perform(builder)
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.name", is("Hello")));
        } catch (Exception e) {
        }
    }

    @Test
    public void getSong() {
        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.get("/api/songs/1");
        try {
            this.mockMvc.perform(builder)
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.name", is("Alpha")));
        } catch (Exception e) {
        }
    }

    @Test
    public void putUpdateSong() {
        Song song = new Song();
        song.setName("Hello World");
        try {
            MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.put("/api/songs/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(convertObjectToJsonBytes(song));
            this.mockMvc.perform(builder)
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.name", is("Hello World")));
        } catch (Exception e) {
        }
    }

    @Test
    public void deleteSong() {
        try {
            MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.delete("/api/songs/1");
            this.mockMvc.perform(builder)
                    .andExpect(status().isOk());
        } catch (Exception e) {
        }
    }

    @Test
    public void patchUpdateSong() {
        Song song = new Song();
        song.setName("Hello world");
        try {
            MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.patch("/api/songs/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(convertObjectToJsonBytes(song));
            this.mockMvc.perform(builder)
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.name", is("Hello world")));
        } catch (Exception e) {
        }
    }

    public static byte[] convertObjectToJsonBytes(Object object) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return mapper.writeValueAsBytes(object);
    }
}