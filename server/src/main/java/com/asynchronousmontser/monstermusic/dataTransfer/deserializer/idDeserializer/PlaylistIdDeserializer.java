package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.idDeserializer;

import com.asynchronousmontser.monstermusic.model.Playlist;
import org.springframework.stereotype.Component;

@Component
public class PlaylistIdDeserializer extends IdDeserializer<Playlist> {
    public PlaylistIdDeserializer() {
        super(Playlist.class);
    }
}
