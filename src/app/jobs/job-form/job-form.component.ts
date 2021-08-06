import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JobsService} from "../../shared/services/jobs.service";
import {ActivatedRoute, Router} from "@angular/router"
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
  control?: AbstractControl;
}
const InputConf=[
  { name: "title", type: "text" },
  { name: "salary", type: "text" },
  { name: "devise", type: "text" },
  { name: "field", type: "select", options: [] },
  { name: "level", type: "select",options: [] },
  { name: "type", type: "radio", text:"Type de contrat :", options: [] },
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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobService :JobsService
  ) {}

  ngOnInit() {
    this.initjobForm();
    for (let input of this.inputs) {
      input.control = this.jobForm.get(input.name);
      if(input.options){
        input.options= this.extractOptions(input.name);
      }
    }
  }

  onSubmitForm() {
    let job:Job=this.jobForm.value
    job.pubDate=new Date();
    this.jobService.persist(job);
    this.jobService.flush();
    this.router.navigate(["/"]);
  }


  /**
   * initialise le formaulaire
   */
  initjobForm(job:Job=defaultJob) {
    this.jobForm = this.formBuilder.group(
      {
        title: [job.title, Validators.required],
        salary: [
          job.salary,
          [Validators.required, Validators.pattern(new RegExp("^\\d+$"))]
        ],
        devise: job.devise,
        skills: this.formBuilder.array([]),
        field: job.field,
        level: job.level,
        type: ["", Validators.required],
        company: job.company,
        adresse: job.adresse,
        town: job.town,
        contacts: this.formBuilder.group(
          {
            emails: this.formBuilder.array([]),
            phones: this.formBuilder.array([])
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
    return this.formBuilder.group({competence:[skill.skill,[Validators.required]],niveau:[skill.level,[Validators.required]]})
  }

  /**
   * valide les contacts
   * un contact est invalide s'il n'y a ni num de phone ni email
   * il faut aumoin un numéro ou un emails
   */
  contactValidator(g: FormGroup) { console.log(g.parent)
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
    let newPhone = this.formBuilder.control(phone, [Validators.required]);
    this.phones.push(newPhone);
  }

  onAddEmail(email=null) {
    let newEmail = this.formBuilder.control(email, {
      validators: [Validators.required, Validators.email]
    });
    this.emails.push(newEmail);
  }
  /**
   * ajout dynamique d'une compétence
   */
  onAddSkill() {
    let newSkill = this.skillsToFormGroup();
    this.skills.push(newSkill);
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
