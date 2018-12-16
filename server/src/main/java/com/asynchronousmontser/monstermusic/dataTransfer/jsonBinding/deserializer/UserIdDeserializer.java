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

@Component
public class UserIdDeserializer extends StdDeserializer<User> {

    private EntityManager entityManager;

    public UserIdDeserializer() {
        this(null);
    }

    public UserIdDeserializer(Class<?> vc) {
        super(vc);
    }

    @Autowired
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public User deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonToken token = p.getCurrentToken();
        Integer id = null;
        if (token == JsonToken.VALUE_STRING) {
            id = Integer.parseInt(p.getText());
        }
        if (token == JsonToken.VALUE_NUMBER_INT) {
            id = p.getNumberValue().intValue();
        }
        if (id != null) {
            return entityManager.find(User.class, id);
        }
        return null;
    }
}
