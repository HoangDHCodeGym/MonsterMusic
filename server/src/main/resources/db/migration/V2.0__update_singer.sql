ALTER TABLE singer
  ADD name NVARCHAR(128),
  ADD age INT(4),
  ADD description NVARCHAR(512),
  ADD favor INT(11) DEFAULT 0,
  ADD created_date DATETIME;

