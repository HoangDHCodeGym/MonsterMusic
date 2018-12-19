package com.asynchronousmontser.monstermusic.controller;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

class PatchHandler {
    static <T> T patch(T patch, T origin) {
        for (Field field : origin.getClass().getDeclaredFields()) {
            try {
                PropertyDescriptor descriptor = new PropertyDescriptor(field.getName(), origin.getClass());
                Method getter = descriptor.getReadMethod();
                Class<?> returnedType = getter.getReturnType();
                Method setter = descriptor.getWriteMethod();
                JsonProperty property = field.getAnnotation(JsonProperty.class);
                if (property == null || property.access() != JsonProperty.Access.READ_ONLY) {
                    Object returnObject = getter.invoke(patch);
                    if (returnObject != null) {
                        setter.invoke(origin, returnedType.cast(returnObject));
                    }
                }
            } catch (Exception e) {
                // keep going
            }
        }
        return origin;
    }
}
