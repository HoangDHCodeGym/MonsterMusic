package com.asynchronousmontser.monstermusic;

import com.asynchronousmontser.monstermusic.storage.StorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class MonsterMusicApplication {

    public static void main(String[] args) {
        SpringApplication.run(MonsterMusicApplication.class, args);
    }

}
