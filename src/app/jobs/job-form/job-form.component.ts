import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JobsService} from "../../shared/services/jobs.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router"
import {Job} from "../../shared/interfaces/job.interface";
import {filters} from "../../shared/filter/job/abstract.job.filter";
const defaultJob:Job={
  title: "Angular Developer",
  salary: 3000,
  devise: "euro",
  skills: [{skill:"Angular", level:"confirmed"}],
  field: "",
  level: "confirmed",
  type: "CDI : Contract of indefinite duration",
  company: "Google",
  adresse: "75 Avenue Charles de Gaulle",
  town: "Paris",
  contacts: { emails: [], phones: [] },
  descriptionJob: "Lorem ipsum dolor sit amet. Sit quibusdam dolor et tempore veniam hic nemo consequatur et explicabo consequatur qui laudantium ipsum! In quae galisum rem accusantium maiores eum dolore dolor ut recusandae fuga 33 illo autem vel blanditiis expedita et voluptates iusto. Non iste voluptatem aut necessitatibus autem ad omnis voluptatem et fuga dolorum. ",
  descriptionProfil: "Non galisum pariatur et atque facere nam magnam sint non nihil expedita est autem omnis! Est possimus internos qui repudiandae distinctio eos dignissimos sequi et Quis exercitationem est impedit repellendus quo eaque quasi. Non dolore quidem eos delectus officiis ut explicabo provident a nisi quia. "
}
interface Input {
  name: string;
  type: string;
  options?: any[];
  text?: string;
  select?:string;
  control?: AbstractControl;
}
const InputConf=[
  { name: "title", type: "text" },
  { name: "salary", type: "text" },
  { name: "devise", type: "text" },
  { name: "field", type: "select", options: [] ,select:"#"},
  { name: "level", type: "select",options: [],select:"#" },
  { name: "type", type: "radio", text:"Type de contrat :", options: [] ,select:"#"},
  { name: "company", type: "text" },
  { name: "adresse", type: "text" },
  { name: "town", type: "select",options: [] },
  { name: "descriptionJob", type: "textarea",text:"description of job"},
  { name: "descriptionProfil", type: "textarea",text:"description of profil for job" }
];
@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {

  jobForm: FormGroup;
  inputs: Input[] = InputConf;
  job!:Job;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobService :JobsService
  ) {}

  ngOnInit() {
    console.log('well comme');
   this.route.paramMap.subscribe((paramMap: ParamMap) => {
     let index = +paramMap.get('index');
     if (index) {
       this.jobService.getJob(index).subscribe((job)=> {
         this.job = job
         this.initjobForm(this.job);
         this.initInput();
       });

     }else{
       this.initjobForm();
       this.initInput();
     }


   })
  }

  initInput(){
    for (let input of this.inputs) {
      input.control = this.jobForm.get(input.name);
      if(input.options){
        input.options= this.extractOptions(input.name);
      }
    }
  }

  onSubmitForm() {
    let job:Job=this.jobForm.value
    if(this.job){
      job.id=this.job.id;
    }
    job.pubDate=new Date();
    let id=this.jobService.persist(job);
    this.jobService.flush();
    this.router.navigate(["job",id]);
  }


  /**
   * initialise le formaulaire
   */
  initjobForm(job:Job=defaultJob) {
    let emails=job.contacts.emails?this.formBuilder.array(job.contacts.emails.map((email)=>this.emailToFromControl(email))):[]
    let phones=job.contacts.phones?this.formBuilder.array(job.contacts.phones.map((phone)=>this.phoneToFromControl(phone))):[]
    this.jobForm = this.formBuilder.group(
      {
        title: [job.title, Validators.required],
        salary: [
          job.salary,
          [Validators.required, Validators.pattern(new RegExp("^\\d+$"))]
        ],
        devise: job.devise,
        skills: this.formBuilder.array(job.skills.map((skill)=>this.skillsToFormGroup(skill))),
        field: job.field,
        level: job.level,
        type: [job.type, Validators.required],
        company: job.company,
        adresse: job.adresse,
        town: job.town,
        contacts: this.formBuilder.group(
          {
            emails: emails,
            phones: phones
          },
          { validators: [Validators.required, this.contactValidator] }
        ),
        descriptionJob: [job.descriptionJob, { validators: [Validators.minLength(10),Validators.required] }],
        descriptionProfil: job.descriptionProfil
      },
      { validators: Validators.required }
    );
  }

  skillsToFormGroup(skill:{skill:string,level:string}={skill:"",level:""}){
    return this.formBuilder.group({skill:[skill.skill,[Validators.required]],level:[skill.level,[Validators.required]]})
  }
  emailToFromControl(email="zozo@gmail.com"){
    return this.formBuilder.control(email, {
      validators: [Validators.required, Validators.email]
    });
  }

  phoneToFromControl(phone=null){
    return  this.formBuilder.control(phone, [Validators.required]);
  }
  /**
   * valide les contacts
   * un contact est invalide s'il n'y a ni num de phone ni email
   * il faut aumoin un numéro ou un emails
   */
  contactValidator(g: FormGroup) {
    return g.get("emails").value.length === 0 &&
    g.get("phones").value.length === 0
      ? { contact: true, message: "Malo need a least one contact" }
      : null;
  }

  /**
   * recupère le controle de contacts
   */
  get contacts(): FormGroup {
    return this.jobForm.get("contacts") as FormGroup;
  }


  get emails(): FormArray {
    return this.contacts.get("emails") as FormArray;
  }

  /**
   * controles de phones
   */
  get phones(): FormArray {
    return this.jobForm.get("contacts.phones") as FormArray;
  }

  /**
   * controles de skills
   */
  get skills(): FormArray {
    return this.jobForm.get("skills") as FormArray;
  }

  /**
   * ajout dynamique de numéro de téléphone
   */
  onAddPhone(phone=null) {
    this.phones.push(this.phoneToFromControl(phone));
  }

  onAddEmail(email=null) {
    this.emails.push(this.emailToFromControl(email));
  }
  /**
   * ajout dynamique d'une compétence
   */
  onAddSkill() {
    this.skills.push(this.skillsToFormGroup());
  }

  /**
   * recupère les options des filtres
   */
  extractOptions(name: string): any[] {
    return filters
      .find(filter => {
        return filter.name == name;
      })
      .values.map(ob => {
        return ob.name;
      });
  }

}
