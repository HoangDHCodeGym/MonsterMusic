package com.asynchronousmontser.monstermusic.controller;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

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

    static <T> List<T> patchList(List<T> origin, List<T> patch) {
        if (patch == null) {
            return origin;
        }
        if (origin == null) {
            return patch;
        }
        List<T> patchedList = new ArrayList<>();
        patchedList.addAll(origin);
        patchedList.addAll(patch);
        //removed duplicate in list.
        List<T> set = new ArrayList<>(new HashSet<>(patchedList));
        return set;
    }

}
