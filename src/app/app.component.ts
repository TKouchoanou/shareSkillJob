import { Component } from '@angular/core';
import {JobsService} from "./shared/services/jobs.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shareSkillJob';
  constructor(private jobsService:JobsService) {
  }
}
