import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { SamplecrudComponent } from './samplecrud/samplecrud.component';
import { UploadSongComponent } from './songs/upload-song/upload-song.component';

@NgModule({
  declarations: [
    AppComponent,
    SamplecrudComponent,
    UploadSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
