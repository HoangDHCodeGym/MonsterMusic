import {Component, Inject, OnInit} from '@angular/core';
import {FileService} from "../../../service/file.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ObjectResolverService} from "../../../service/object-resolver.service";
import {Singer} from "../../../model/singer";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-updatesong',
  templateUrl: './updateSong.component.html',
  styleUrls: ['./updateSong.component.scss']
})
export class UpdateSongComponent implements OnInit {
  songForm = {
    name: '',
    singerName: '',
    singer: null,//TODO:update constraint
    link: null,
  };
  id: number;
  songFiles: FileList;

  status: string = '';

  constructor(private fileService: FileService,
              private httpClient: HttpClient,
              private resolver: ObjectResolverService,
              private router: ActivatedRoute,
              @Inject('SONG_API') private url: string) {
  }

  ngOnInit() {
    this.router
      .paramMap
      .subscribe((paramMap: ParamMap) => {
        this.id = Number(paramMap.get('id'));
        this.fetch();
        this.resolver.get(this.url, this.id).subscribe(
          out => {
            console.log(out)
          }
        )
      });
  }

  append(files: FileList) {
    this.songFiles = files;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.songFiles) {
        this.status = 'uploading...';
        this.fileService
          .upload(this.songFiles)
          .subscribe(response => {
            if (response.status == 201) {
              this.fileService
                .delete(this.songForm.link)
                .subscribe(resp => {
                  if (resp.status == 200) {
                    this.songForm.link = response.body[0];
                    this.changeInfo();
                  } else {
                    this.deleteFile(response.body[0], false);
                    this.status = 'upload failed';
                  }
                })
            } else {
              this.status = 'upload failed'
            }
          })
      } else {
        this.changeInfo();
      }
    }
  }

  changeInfo() {
    this.status = 'updating info...';
    this.httpClient
      .patch<HttpResponse<any>>(this.url + '/' + this.id, this.songForm, {observe: 'response'})
      .subscribe(
        (resp) => {
          if (resp.status == 200) {
            this.status = 'updated';
          } else {
            this.status = 'update failed';
          }
          this.fetch()
        }
      )
  }

  deleteFile(fileName, deleteInfo: boolean = true) {
    this.fileService
      .delete(fileName)
      .subscribe(resp => {
        if (deleteInfo) {
          this.httpClient
            .delete(this.url + '/' + this.id)
            .subscribe();
        }
      })
  }

  delete() {
    this.status = 'deleting';
    this.deleteFile(this.songForm.link);
    this.status = 'deleted';
  }

  fetch() {
    this.httpClient
      .get(this.url + '/' + this.id)
      .toPromise()
      .then(resp => this.resolver.resolve(resp) as any)
      .then(fullSong => {
        this.songForm.link = fullSong.link;
        this.songForm.name = fullSong.name;
        this.httpClient
          .get(fullSong.singer, {observe: 'response'})
          .subscribe(resp => {
            const singer = this.resolver.resolveBase<Singer>(resp.body);
            this.songForm.singerName = singer.self;
            this.songForm.name = singer.name;
          })
      })
  }
}
