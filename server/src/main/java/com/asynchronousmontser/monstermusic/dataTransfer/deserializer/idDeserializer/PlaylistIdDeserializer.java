package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.idDeserializer;

import com.asynchronousmontser.monstermusic.model.Playlist;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.io.IOException;

@Component
public class PlaylistIdDeserializer extends StdDeserializer<Playlist> {

    private EntityManager entityManager;

    public PlaylistIdDeserializer() {
        this(null);
    }

    public PlaylistIdDeserializer(Class<?> vc) {
        super(vc);

    }

    @Autowired
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Playlist deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonToken token = p.getCurrentToken();
        Integer id = null;
        if (token == JsonToken.VALUE_STRING) {
            id = Integer.parseInt(p.getText());
        }
        if (token == JsonToken.VALUE_NUMBER_INT) {
            id = p.getNumberValue().intValue();
        }
        if (id != null) {
            return entityManager.find(Playlist.class, id);
        }
        return null;
    }
}
