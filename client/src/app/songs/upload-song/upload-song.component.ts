import {Component, Inject, OnInit} from '@angular/core';
import {FileService} from "../../../service/file.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Song} from "../../../model/song";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.scss']
})
export class UploadSongComponent implements OnInit {
  createSongForm: FormGroup;
  songFiles: FileList;
  status: string = '';

  onSubmit() {
    this.status = 'uploading...';
    this.fileService
      .upload(this.songFiles)
      .subscribe((response) => {
        if (response.status === 200) {
          response = response.body as string[];
          const song: Song = {
            id: null,
            //TODO: fill constrains
            singer: null,
            creator: null,
            name: this.createSongForm.value.name,
            createdDate: new Date(),
            link: response[0]
          };
          this.httpClient
            .post(this.url, song, {observe: 'response'})
            .subscribe(response => {
              if (response.status === 201) {
                this.status = 'uploaded';
              } else {
                this.status = 'error: ' + response.status;
              }
            })
        } else {
          this.status = 'upload failed'
        }
      })
  }

  constructor(private fileService: FileService,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              @Inject('SONG_API') private url: string) {
  }

  append(files: FileList) {
    this.songFiles = files;
  }

  ngOnInit() {
    this.createSongForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      singer: ['', [Validators.required]],
      file: ['', Validators.required]
    })
  }

}
