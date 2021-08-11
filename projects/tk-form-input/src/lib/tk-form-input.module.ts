import { NgModule } from '@angular/core';
import { TkFormInputComponent } from './tk-form-input.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PhoneInputComponent} from "./phone-input/phone-input.component";
import {FlexLayoutModule} from "@angular/flex-layout";



@NgModule({
  declarations: [
    TkFormInputComponent,PhoneInputComponent
  ],
  imports: [
    CommonModule,FormsModule,FlexLayoutModule
  ],
  exports: [
    TkFormInputComponent,PhoneInputComponent
  ]
})
export class TkFormInputModule { }
