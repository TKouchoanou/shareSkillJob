import {Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbCarousel, NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [NgbCarouselConfig]
})
export class IndexComponent {

  showNavigationArrows = true;
  showNavigationIndicators = true;
  images = ['https://iaa-network.com/wp-content/uploads/2021/02/Job-openings.jpg','https://www.carenews.com/sites/default/files/styles/og_image/public/2020-08/neuf-sites-job-sens-carenews.png?itok=vxQTN5Kz','https://etu.u-bordeaux-montaigne.fr/_contents/ametys-internal%253Asites/etu/ametys-internal%253Acontents/job-dating-a-l-universite-bordeaux-montaigne-2/_metadata/illustration/image/e-job-dating-u-bordeaux-montaigne_2.png?objectId=defaultWebContent://2d529f81-3fef-44af-af78-b3cfd4e733be']
  items=[{title:'Search Job',link:"jobs",src:this.images[0]},{title:'Create Job',link:"job/new",src:this.images[1]},{title:'Update Job',link:"job/1/edit",src:this.images[2]}];
  @ViewChild(NgbCarousel)  carroussel:NgbCarousel;
  constructor(private config: NgbCarouselConfig) {
    this.config.showNavigationArrows = true;
    this.config.showNavigationIndicators = true;
    this.config.interval=2000;
  }



}
