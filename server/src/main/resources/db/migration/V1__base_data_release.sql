CREATE TABLE user
(
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT
)
  CHARACTER SET utf8
  COLLATE utf8_unicode_ci;

CREATE TABLE singer
(
  id      INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT(11),
  FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE SET NULL
)
  CHARACTER SET utf8
  COLLATE utf8_unicode_ci;

CREATE TABLE song
(
  id        INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id   INT(11),
  singer_id INT(11),
  FOREIGN KEY (singer_id) REFERENCES singer (id) ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE SET NULL
)
  CHARACTER SET utf8
  COLLATE utf8_unicode_ci;

CREATE TABLE playlist
(
  id      INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT(11),
  FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE SET NULL
)
  CHARACTER SET utf8
  COLLATE utf8_unicode_ci;

CREATE TABLE playlist_song
(
  playlist_id INT(11) NOT NULL,
  song_id     INT(11) NOT NULL,
  PRIMARY KEY (playlist_id, song_id),
  FOREIGN KEY (playlist_id) REFERENCES playlist (id) ON DELETE SET NULL ,
  FOREIGN KEY (song_id) REFERENCES song (id) ON DELETE SET NULL
)
  CHARACTER SET utf8
  COLLATE utf8_unicode_ci;