ALTER TABLE playlist
  ADD name NVARCHAR(128),
  ADD description NVARCHAR(512),
  ADD views INT(20) DEFAULT 0,
  ADD favor INT(11) DEFAULT 0,
  ADD created_date DATETIME;