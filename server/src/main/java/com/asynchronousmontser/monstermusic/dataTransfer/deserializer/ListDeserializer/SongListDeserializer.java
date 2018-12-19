package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.ListDeserializer;

import com.asynchronousmontser.monstermusic.model.Song;
import org.springframework.stereotype.Component;


@Component
public class SongListDeserializer extends ListDeserializer<Song> {
    protected SongListDeserializer() {
        super(Song.class);
    }
}
