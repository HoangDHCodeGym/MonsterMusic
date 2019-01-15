package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.ListDeserializer;

import com.asynchronousmontser.monstermusic.model.Song;
import org.springframework.stereotype.Component;


@Component
public class SongListDeserializer extends ListDeserializer<Song> {
    public SongListDeserializer() {
        super(Song.class);
    }
}
