package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.idDeserializer;

import com.asynchronousmontser.monstermusic.model.Playlist;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.IOException;


public abstract class IdDeserializer<T> extends StdDeserializer<T> {
    private Class<T> entityClass;

    private EntityManager entityManager;

    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    protected IdDeserializer(Class<T> entityClass) {
        this(null, entityClass);
    }

    private IdDeserializer(Class<?> vc, Class<T> entityClass) {
        super(vc);
        this.entityClass = entityClass;
    }

    @Override
    public T deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonToken token = p.getCurrentToken();
        Integer id = null;
        if (token == JsonToken.VALUE_STRING) {
            id = Integer.parseInt(p.getText());
        }
        if (token == JsonToken.VALUE_NUMBER_INT) {
            id = p.getNumberValue().intValue();
        }
        if (id != null) {
            return entityManager.find(entityClass, id);
        }
        return null;
    }
}
