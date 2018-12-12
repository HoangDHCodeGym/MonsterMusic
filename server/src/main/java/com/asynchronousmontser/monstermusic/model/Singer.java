package com.asynchronousmontser.monstermusic.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "singer")
public class Singer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(mappedBy = "singer", cascade = CascadeType.ALL)
    private List<Song> songList;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User creator;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date", columnDefinition = "DATETIME")
    private Date createdDate;

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
