import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileService} from "../../../service/file.service";
import {HttpClient} from "@angular/common/http";
import {Song} from "../../../model/song";
import {ObjectResolverService} from "../../../service/object-resolver.service";

@Component({
  selector: 'app-updatesong',
  templateUrl: './updateSong.component.html',
  styleUrls: ['./updateSong.component.scss']
})
export class UpdateSongComponent implements OnInit {
  updateSongForm: FormGroup;
  id: number = 6;
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
          this.song = this.resolver.resolve<Song>(songResp);
          console.log(songResp);
        }
        console.log(this.song)
      })
  }

  append(files: FileList) {
    this.songFiles = files;
  }

  onSubmit() {
    const changedValue = this.updateSongForm.value;
    if (changedValue) {
      for (const val in changedValue) {
        if (changedValue.hasOwnProperty(val)) {
          const property = changedValue[val];
          if (property || property != '') {
            if (this.song[val] != null) {
              this.song[val] = property;
            }
          }
        }
      }
    }
  }
}
