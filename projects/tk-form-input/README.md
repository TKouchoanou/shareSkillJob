# TkFormInput
License: MIT

### install requirements

```
npm i @angular/forms @angular/flex-layout
```
### how to use the phone input component ?
Only the PhoneInputComponent is available for this version
#### In your module
```
import { TkFormInputModule } from 'tk-form-input';
@NgModule({
imports: [TkFormInputModule]
})
```
## With ReactiveForm 
#### In your component typescript class
Don't forget to import ReactiveFormsModule
```
this.form = this.formBuilder.group({
phone : ['']
});
```
##### In your component html
bind correctly your control name with formControlName.
```
<phone-input  formControlName="phone"></phone-input>
```
## With template driven form
##### In your component html
```<phone-input [(ngModel)]="phone" name="phone"> </phone-input>```
> Remember that "phone" must be a property of your component class and you need to import FormsModule to use ngModel
## Use all options 
```
<phone-input [showKeyBoard]="false" [placeHolder]="'00567-857-678'" [groupDigitsBy]="3" [separateAfter]="4" [digitGroupSeparator]="'-'" [inputNgClass]="{'form-control':true}" ></phone-input>
```
