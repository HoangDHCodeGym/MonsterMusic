package com.asynchronousmontser.monstermusic.dataTransfer.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ListDeserializer extends StdDeserializer<List> {

    public ListDeserializer() {
        this(null);
    }

    public ListDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public List deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        return null;
    }
}
