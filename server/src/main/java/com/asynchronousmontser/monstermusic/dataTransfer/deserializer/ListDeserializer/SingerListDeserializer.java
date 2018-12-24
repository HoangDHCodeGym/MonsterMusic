package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.ListDeserializer;

import com.asynchronousmontser.monstermusic.model.Singer;
import org.springframework.stereotype.Component;

@Component
public class SingerListDeserializer extends ListDeserializer<Singer> {
    public SingerListDeserializer() {
        super(Singer.class);
    }
}