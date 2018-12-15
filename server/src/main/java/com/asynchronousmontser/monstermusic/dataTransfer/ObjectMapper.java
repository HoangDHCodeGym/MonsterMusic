package com.asynchronousmontser.monstermusic.dataTransfer;

import java.lang.reflect.Method;

public class ObjectMapper {
    public <T> T map(Object object, Class<T> outputType, boolean parseNull) {
        Object output = new Object();
        Class<?> inputType = object.getClass();
        for (Method method : outputType.getDeclaredMethods()) {
            if (method.getName().matches("^set\\w+$")) {
                Method setter = method;
                String fieldName = method.getName().substring(3);
                try {
                    Method getter = inputType.getDeclaredMethod("get" + fieldName);
                    Class<?> returnType = getter.getReturnType();
                    Object gettedValue = getter.invoke(object);
                    if (parseNull || gettedValue != null) {
                        setter.invoke(output, returnType.cast(gettedValue));
                    }
                } catch (Exception e) {
                    //keep going and left the value null if cannot find setter or getter.
                }
            }
        }
        return outputType.cast(output);
    }

}
