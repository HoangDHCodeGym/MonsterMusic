package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.idDeserializer;

import com.asynchronousmontser.monstermusic.model.Singer;
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
public class SingerIdDeserializer extends StdDeserializer<Singer> {

    private EntityManager entityManager;

    public SingerIdDeserializer() {
        this(null);
    }

    public SingerIdDeserializer(Class<?> vc) {
        super(vc);

    }

    @Autowired
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Singer deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonToken token = p.getCurrentToken();
        Integer id = null;
        if (token == JsonToken.VALUE_STRING) {
            id = Integer.parseInt(p.getText());
        }
        if (token == JsonToken.VALUE_NUMBER_INT) {
            id = p.getNumberValue().intValue();
        }
        if (id != null) {
            return entityManager.find(Singer.class, id);
        }
        return null;
    }
}

