import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR,multi:true,useExisting: forwardRef(()=> PhoneInputComponent)}],
})
export class PhoneInputComponent implements ControlValueAccessor , OnInit{
  digitsButton: string="."
  @Input('showKeyBoard') addDigits: boolean =true;
  @Input('digitGroupSeparator')  digitSeparator=" ";
  @Input() inputNgClass={};
  @Input() placeHolder="phone number";
  @Input('groupDigitsBy') nbDigitsByGroup:number=2;
  @Input() separateAfter;
  digits: Array<number| string> =new Array(10).fill(0).map((v,i)=>i);
   phoneNumber: string
   phoneNumberDigits:Array<string|number>=[];
  public onChange:Function;
  public onTouched:Function;
  public disabled:boolean;

  ngOnInit(): void {
    if(!this.separateAfter){
      this.separateAfter=this.nbDigitsByGroup;
    }
  }

  writeValue(value: string): void {
      if(value){
      let digits=value.split('');
      digits.forEach((v)=>this.pushDigit(v));
      this.updatePhoneNumber();
      this.valueChange();
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
    this.phoneNumberDigits=[];
    this.phoneNumber='';
  }

  pop(){
    this.phoneNumberDigits.pop();
    this.updatePhoneNumber();
  }

  update(i: number|string) {
    this.pushDigit(i);
    this.updatePhoneNumber();
    this.valueChange();
  }

  /**
   * @param i
   */
  pushDigit(i:number|string){
    if(this.phoneNumberDigits.length===this.separateAfter||
      this.phoneNumberDigits[this.phoneNumberDigits.length-1-this.nbDigitsByGroup]===this.digitSeparator){
      this.phoneNumberDigits.push(this.digitSeparator);
    }
    this.phoneNumberDigits.push(i);
  }

  updatePhoneNumber(){
    this.phoneNumber=this.phoneNumberDigits.join('')
  }

  /**
   * appel le OnChange de ControlValueAccessor
   */
  valueChange(){
    if(this.onChange){
      this.onChange(this.phoneNumber);
    }
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
