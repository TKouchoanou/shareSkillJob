##TkFormInput
License: MIT

### how to use the phone input component with reactive form
#### In your module
```
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import { TkFormInputModule } from 'tk-form-input';
@NgModule({
imports: [TkFormInputModule]
})
```
#### In your component type script
```
this.form = this.formBuilder.group({
phone : [''],
});
```
##### In your html
```
<phone-input  [showKeyBoard]="false" [inputNgClass]="{'form-control':true}" formControlName="i"></phone-input>
```

