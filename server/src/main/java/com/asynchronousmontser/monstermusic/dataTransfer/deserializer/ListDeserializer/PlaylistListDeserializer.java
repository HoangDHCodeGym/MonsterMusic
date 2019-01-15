package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.ListDeserializer;

import com.asynchronousmontser.monstermusic.model.Playlist;
import org.springframework.stereotype.Component;

@Component
public class PlaylistListDeserializer extends ListDeserializer<Playlist> {
    public PlaylistListDeserializer() {
        super(Playlist.class);
    }
}
