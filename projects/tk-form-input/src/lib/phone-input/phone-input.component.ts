import {Component, forwardRef,Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR,multi:true,useExisting: forwardRef(()=> PhoneInputComponent)}],
})
export class PhoneInputComponent implements ControlValueAccessor {
  digitsButton: string="."
  @Input('showKeyBoard') addDigits: boolean =true;
  @Input() private digitSeparator=" ";
  @Input() inputNgClass={};
   digits: Array<number| string> =new Array(10).fill(0).map((v,i)=>i);
   phoneNumber: string
   phoneNumberdigits:Array<string|number>=[];
  public onChange:Function;
  public onTouched:Function;
  public disabled:boolean;on


  writeValue(value: string): void {
      if(value){
      let digits=value.split('');
      digits.forEach((v)=>this.pushDigit(v));
      this.upadetPhoneNumber();
      }
    }

    registerOnChange(fn: any): void {
        this.onChange=fn;
    }
    registerOnTouched(fn: any): void {
       this.onTouched=fn;
    }
    setDisabledState?(isDisabled: boolean): void {
      this.disabled=isDisabled;
    }

  reset() {
    this.phoneNumberdigits=[];
    this.phoneNumber='';
  }

  pop(){
    this.phoneNumberdigits.pop();
   this.upadetPhoneNumber();
  }

  update(i: number|string) {
    this.pushDigit(i);
    this.upadetPhoneNumber();
    this.onChange(this.phoneNumber);
  }

  pushDigit(i:number|string){
    if(this.phoneNumberdigits.length===2 || this.phoneNumberdigits[this.phoneNumberdigits.length-3]===this.digitSeparator){
      this.phoneNumberdigits.push(this.digitSeparator);
    }
    this.phoneNumberdigits.push(i);
  }

  upadetPhoneNumber(){
    this.phoneNumber=this.phoneNumberdigits.join('')
  }
 public hideDigits(){
    this.addDigits=false;
    this.digitsButton="*"
  }
 public showDigits(){
    this.addDigits=true;
    this.digitsButton="."
  }

  toggle() {
    if(this.addDigits===true){
      this.hideDigits();
    }else {
      this.showDigits();
    }
  }
}
