package com.asynchronousmontser.monstermusic.model;


import com.asynchronousmontser.monstermusic.dataTransfer.deserializer.ListDeserializer.PlaylistListDeserializer;
import com.asynchronousmontser.monstermusic.dataTransfer.deserializer.ListDeserializer.SingerListDeserializer;
import com.asynchronousmontser.monstermusic.dataTransfer.deserializer.ListDeserializer.SongListDeserializer;
import com.asynchronousmontser.monstermusic.dataTransfer.serializer.ListSerializer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonDeserialize(using = PlaylistListDeserializer.class)
    @JsonSerialize(using = ListSerializer.class)
    @OneToMany(mappedBy = "creator")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<Playlist> playlistList;


    @JsonDeserialize(using = SingerListDeserializer.class)
    @JsonSerialize(using = ListSerializer.class)
    @OneToMany(mappedBy = "creator")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<Singer> singerList;

    @JsonDeserialize(using = SongListDeserializer.class)
    @JsonSerialize(using = ListSerializer.class)
    @OneToMany(mappedBy = "creator")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<Song> songList;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date", columnDefinition = "DATETIME")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date createdDate = new Date();

    private String name;

    private String email;

    private Integer age;

    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Playlist> getPlaylistList() {
        return playlistList;
    }

    public void setPlaylistList(List<Playlist> playlistList) {
        this.playlistList = playlistList;
    }

    public List<Singer> getSingerList() {
        return singerList;
    }

    public void setSingerList(List<Singer> singerList) {
        this.singerList = singerList;
    }

    public List<Song> getSongList() {
        return songList;
    }

    public void setSongList(List<Song> songList) {
        this.songList = songList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
