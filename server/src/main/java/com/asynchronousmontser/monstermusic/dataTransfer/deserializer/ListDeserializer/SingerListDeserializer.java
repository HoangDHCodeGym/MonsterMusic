package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.ListDeserializer;

import com.asynchronousmontser.monstermusic.model.Singer;
import org.springframework.stereotype.Component;

@Component
public class SingerListDeserializer extends ListDeserializer<Singer> {
    protected SingerListDeserializer() {
        super(Singer.class);
    }
}