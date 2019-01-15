package com.asynchronousmontser.monstermusic.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;

@PropertySource("classpath:application.properties")
@ConfigurationProperties("storage")
public class StorageProperties {

    private String location;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
