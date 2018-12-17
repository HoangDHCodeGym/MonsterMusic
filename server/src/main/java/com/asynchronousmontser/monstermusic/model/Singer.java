package com.asynchronousmontser.monstermusic.model;

import com.asynchronousmontser.monstermusic.dataTransfer.deserializer.ListDeserializer.SongListDeserializer;
import com.asynchronousmontser.monstermusic.dataTransfer.deserializer.idDeserializer.UserIdDeserializer;
import com.asynchronousmontser.monstermusic.dataTransfer.serializer.ListSerializer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "singer")
public class Singer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonSerialize(using = ListSerializer.class)
    @JsonDeserialize(using = SongListDeserializer.class)
    @OneToMany(mappedBy = "singer", cascade = CascadeType.ALL)
    private List<Song> songList;

    @JsonDeserialize(using = UserIdDeserializer.class)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User creator;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date", columnDefinition = "DATETIME")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date createdDate = new Date();

    private String name;

    public Singer() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Song> getSongList() {
        return songList;
    }

    public void setSongList(List<Song> songList) {
        this.songList = songList;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
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
}
