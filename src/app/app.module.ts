import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { UtilityService } from './utility.service';
import { Component2Component } from './component2/component2.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent, Component2Component],
  bootstrap: [AppComponent],
  providers: [UtilityService],
})
export class AppModule {}
