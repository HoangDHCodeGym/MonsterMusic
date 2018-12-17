package com.asynchronousmontser.monstermusic.dataTransfer.jsonBinding.deserializer;


import com.asynchronousmontser.monstermusic.model.User;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.lang.reflect.ParameterizedType;

@Component
public class UserIdDeserializer<T> extends StdDeserializer<T> {

    private Class<T> entityClass;
    private EntityManager entityManager;

    public UserIdDeserializer() {
        this(null);
    }

    public UserIdDeserializer(Class<?> vc) {
        super(vc);
        this.entityClass = (Class<T>)
                ((ParameterizedType) getClass()
                        .getGenericSuperclass())
                        .getActualTypeArguments()[0];
    }

    @Autowired
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
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
