import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileService} from "../../../service/file.service";
import {HttpClient} from "@angular/common/http";
import {Song} from "../../../model/song";

@Component({
  selector: 'app-updatesong',
  templateUrl: './updateSong.component.html',
  styleUrls: ['./updateSong.component.scss']
})
export class UpdateSongComponent implements OnInit {
  updateSongForm: FormGroup;
  id: number = 6;
  song: Song;
  songFiles: FileList;
  status: string = '';

  constructor(private fileService: FileService,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              @Inject('SONG_API') private url: string) {
  }

  ngOnInit() {
    this.updateSongForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      singer: ['', [Validators.required]],
      file: ['', Validators.required]
    });
    this.httpClient
      .get(this.url + '/' + this.id, {observe: 'response'})
      .subscribe((resp) => {
        if (resp.status) {
          console.log(resp.status);
          const songResp = resp.body as any;
          this.song = {
            id: this.id,
            name: songResp.name,
            singer: songResp._link.singer.href,
            creator: songResp._link.creator.href,
            createdDate: songResp.createdDate,
            link: songResp.link
          }
        }
        console.log(this.song)
      })
  }

  append(files: FileList) {
    this.songFiles = files;
  }

}
