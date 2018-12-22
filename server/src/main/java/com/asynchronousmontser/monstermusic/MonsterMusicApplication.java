package com.asynchronousmontser.monstermusic;

import com.asynchronousmontser.monstermusic.model.User;
import com.asynchronousmontser.monstermusic.repository.UserRepository;
import com.asynchronousmontser.monstermusic.storage.StorageProperties;
import com.asynchronousmontser.monstermusic.storage.StorageService;
import org.springframework.boot.CommandLineRunner;
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

    @Bean
    CommandLineRunner init(StorageService storageService, UserRepository userRepository) {
        return (args) -> {
            storageService.init();
//            User user = new User();
//            user.setName("Hoang");
//            user.setUsername("hoangdh");
//            user.setPassword("admin");
//            userRepository.save(user);
        };
    }
}
