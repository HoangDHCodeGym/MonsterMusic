### Hướng dẫn sử dụng.

- các đường link:
  - /api/playlists
  - /api/users
  - /api/songs
  - /api/singers
 
  các đường link trên đều theo chuẩn Rest (Put Post Patch Get Delete)
  
- về các model:
  - các model mới chỉ được thiết kế các phần có quan hệ với bảng khác. chi tiết xem, trong /db/dbinfo.png hoặc check file sql trong migration.
  - thêm các trường mới vào model cần giữ nguyên các trường cũ.
  - 1 lưu ý nữa: playlist biết về song nhưng song không biết về playlist.
  
- sau khi up date model, sửa các bảng trong database bằng sql và lưu dưới file
V2__base_data_{tên model}.  
 