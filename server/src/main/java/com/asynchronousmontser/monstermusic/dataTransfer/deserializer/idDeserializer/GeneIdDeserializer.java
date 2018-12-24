package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.idDeserializer;

import com.asynchronousmontser.monstermusic.model.Gene;
import org.springframework.stereotype.Component;

@Component
public class GeneIdDeserializer extends IdDeserializer<Gene> {
    public GeneIdDeserializer() {
        super(Gene.class);
    }
}