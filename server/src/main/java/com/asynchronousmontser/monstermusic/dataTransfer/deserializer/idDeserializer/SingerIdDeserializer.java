package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.idDeserializer;

import com.asynchronousmontser.monstermusic.model.Singer;
import org.springframework.stereotype.Component;


@Component
public class SingerIdDeserializer extends IdDeserializer<Singer> {
    public SingerIdDeserializer() {
        super(Singer.class);
    }
}

