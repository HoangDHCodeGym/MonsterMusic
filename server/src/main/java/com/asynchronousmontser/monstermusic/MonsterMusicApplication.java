package com.asynchronousmontser.monstermusic;

import com.asynchronousmontser.monstermusic.storage.StorageProperties;
import com.asynchronousmontser.monstermusic.storage.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Map;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class MonsterMusicApplication {

    public static void main(String[] args) {
        SpringApplication.run(MonsterMusicApplication.class, args);
    }

    //init storage when start up
    @Bean
    CommandLineRunner init(StorageService storageService) {
        return (args) -> storageService.init();

    }

    // set all notfound mapping to index.html
    @Bean
    ErrorViewResolver supportPathBasedLocationStrategyWithoutHashes() {
        return (request, status, model) -> status == HttpStatus.NOT_FOUND
                ? new ModelAndView("index.html", Collections.emptyMap(), HttpStatus.OK)
                : null;
    }
}
