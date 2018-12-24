package com.asynchronousmontser.monstermusic.dataTransfer.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ListSerializer extends StdSerializer<List> {

    public ListSerializer() {
        this(null);
    }

    public ListSerializer(Class<List> t) {
        super(t);
    }

    @Override
    public void serialize(List value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeNumber(value.size());
    }
}
