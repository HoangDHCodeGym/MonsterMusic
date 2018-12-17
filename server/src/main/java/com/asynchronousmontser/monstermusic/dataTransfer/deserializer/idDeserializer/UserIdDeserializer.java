package com.asynchronousmontser.monstermusic.dataTransfer.deserializer.idDeserializer;

import com.asynchronousmontser.monstermusic.model.User;
import org.springframework.stereotype.Component;


@Component
public class UserIdDeserializer extends IdDeserializer<User> {
    public UserIdDeserializer() {
        super(User.class);
    }
}
