import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileService} from "../../../service/file.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Song} from "../../../model/song";
import {ObjectResolverService} from "../../../service/object-resolver.service";

@Component({
  selector: 'app-updatesong',
  templateUrl: './updateSong.component.html',
  styleUrls: ['./updateSong.component.scss']
})
export class UpdateSongComponent implements OnInit {
  updateSongForm: FormGroup;
  id: number = 1;
  song: Song = new Song();
  songFiles: FileList;
  status: string = '';

  constructor(private fileService: FileService,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private resolver: ObjectResolverService,
              @Inject('SONG_API') private url: string) {
  }

  ngOnInit() {
    this.updateSongForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      singer: ['', [Validators.required]],
    });
    this.httpClient
      .get(this.url + '/' + this.id, {observe: 'response'})
      .subscribe((resp) => {
        if (resp.status == 200) {
          const songResp = resp.body as any;
          this.song = this.resolver.resolveBase<Song>(songResp, this.song);
          console.log(this.song)
        }

      })
  }

  append(files: FileList) {
    this.songFiles = files;
  }

  onSubmit() {
    const changedValue = this.updateSongForm.value;
    this.song = this.resolver
      .resolve(changedValue, this.song);
    if (this.songFiles) {
      this.status = 'uploading files...';
      this.fileService
        .upload(this.songFiles)
        .subscribe((resp) => {
          resp = resp as HttpResponse<any>;
          if (resp.status == 201) {
            this.fileService
              .delete(this.song.link)
              .subscribe((resp) => {
                resp = resp as HttpResponse<any>;
                if (resp.status == 200) {
                  this.song.link = this.songFiles.item(0).name;
                  this.changeInfo();
                }
              });
          } else {
            this.status = 'upload failed'
          }
        });
    } else {
      this.changeInfo();
    }
  }

  changeInfo() {
    this.status = 'updating info...';
    this.httpClient.patch<HttpResponse<any>>(this.url + '/' + this.id, this.song).subscribe(
      (resp) => {
        if (resp.status == 200) {
          this.status = 'updated';
        } else {
          this.status = 'update failed';
        }
      }
    )
  }

}
