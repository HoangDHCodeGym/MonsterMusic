ALTER TABLE playlist
  ADD name NVARCHAR(128),
  ADD views INT(100) DEFAULT 0,
  ADD created_date DATETIME;