package com.asynchronousmontser.monstermusic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping({"/","/edit/**","/upload"})
    public String rootMapping() {
        return "index.html";
    }
}
