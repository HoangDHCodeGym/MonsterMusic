package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.ListDeserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public abstract class ListDeserializer<T> extends StdDeserializer<List<T>> {

    private Class<T> entityClass;

    private EntityManager entityManager;

    //this annotation allow using entity manager without injection
    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    protected ListDeserializer(Class<T> entityClass) {
        this(null, entityClass);
    }

    private ListDeserializer(Class<?> vc, Class<T> entityClass) {
        super(vc);
        this.entityClass = entityClass;
    }

    @Override
    public List<T> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        List<T> list = new ArrayList<T>();
        JsonToken token = p.getCurrentToken();
        if (token == JsonToken.START_ARRAY) {
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
            Integer[] idArray = mapper.readValue(p, Integer[].class);
            for (Integer id : idArray) {
                T entity = entityManager.find(entityClass, id);
                if (entity != null) {
                    list.add(entity);
                }
            }
        }
        return list;
    }
}
