package com.asynchronousmontser.monstermusic.model;

import com.asynchronousmontser.monstermusic.dataTransfer.deserializer.ListDeserializer.PlaylistListDeserializer;
import com.asynchronousmontser.monstermusic.dataTransfer.deserializer.idDeserializer.GeneIdDeserializer;
import com.asynchronousmontser.monstermusic.dataTransfer.deserializer.idDeserializer.SingerIdDeserializer;
import com.asynchronousmontser.monstermusic.dataTransfer.deserializer.idDeserializer.UserIdDeserializer;
import com.asynchronousmontser.monstermusic.dataTransfer.serializer.ListSerializer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "song")
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonDeserialize(using = GeneIdDeserializer.class)
    @ManyToOne
    @JoinColumn(name = "gene_id")
    private Gene gene;

    @JsonDeserialize(using = UserIdDeserializer.class)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User creator;

    @JsonDeserialize(using = SingerIdDeserializer.class)
    @ManyToOne
    @JoinColumn(name = "singer_id")
    private Singer singer;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date", columnDefinition = "DATETIME")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date createdDate = new Date();

    @JsonSerialize(using = ListSerializer.class)
    @JsonDeserialize(using = PlaylistListDeserializer.class)
    @ManyToMany(mappedBy = "songList")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<Playlist> playlistList;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer favor = 0;

    private String name;

    private String link;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer views = 0;

    public Song() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Singer getSinger() {
        return singer;
    }

    public void setSinger(Singer singer) {
        this.singer = singer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Integer getViews() {
        return views;
    }

    public void setViews(Integer views) {
        this.views = views;
    }

    public List<Playlist> getPlaylistList() {
        return playlistList;
    }

    public void setPlaylistList(List<Playlist> playlistList) {
        this.playlistList = playlistList;
    }

    public Integer getFavor() {
        return favor;
    }

    public void setFavor(Integer favor) {
        this.favor = favor;
    }

    public Gene getGene() {
        return gene;
    }

    public void setGene(Gene gene) {
        this.gene = gene;
    }
}
