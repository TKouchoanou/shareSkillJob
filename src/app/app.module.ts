import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule }   from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';

import {RouterModule, Routes} from "@angular/router";
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';

const APP_ROOT:Routes=[
                        {path:'',component:IndexComponent,pathMatch:'full'},
                         {path:'job',loadChildren: ()=>import('./jobs/jobs.module').then((m)=>m.JobsModule)},
                         {path:'jobs',redirectTo:'job'}
                         ]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule, NgbModule, FormsModule, HttpClientModule,RouterModule.forRoot(APP_ROOT)
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
