import {Component, Renderer2} from '@angular/core';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {HeroBannerComponent} from "./hero-banner/hero-banner.component";
import {AchivementComponent} from "./achivement/achivement.component";
import {ActiveJobComponent} from "./active-job/active-job.component";
import {ReviewComponent} from "./review/review.component";
import {TopRatedComponent} from "./top-rated/top-rated.component";
import {CallToActionComponent} from "./call-to-action/call-to-action.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-front',
  standalone: true,
  imports: [
    NavBarComponent,
    HeroBannerComponent,
    AchivementComponent,
    ActiveJobComponent,
    ReviewComponent,
    TopRatedComponent,
    CallToActionComponent,
    FooterComponent
  ],
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent {
  constructor(private renderer: Renderer2) {

    this.loadCss('assets/css/animation.css');
    this.loadCss('assets/css/bootstrap.min.css');
    this.loadCss('assets/css/dropzone.min.css');
    this.loadCss('assets/css/flatpickr.min.css');
    this.loadCss('assets/css/owl.carousel.min.css');
    this.loadCss('assets/css/owl.theme.default.min.css');
    this.loadCss('assets/css/rangeSlider.min.css');
    this.loadCss('assets/css/select2.min.css');
    this.loadCss('assets/css/prism.css');
    this.loadCss('assets/css/fontawesome.css')
    this.loadCss('assets/css/bootstrap-icons.css');
    this.loadCss('assets/css/style.css');
    this.loadScript('assets/js/jquery.min.js');
    this.loadScript('assets/js/popper.min.js');
    this.loadScript('assets/js/bootstrap.min.js');
    this.loadScript('assets/js/flatpickr.js');
    this.loadScript('assets/js/dropzone.min.js');
    this.loadScript('assets/js/counterup.min.js');
    this.loadScript('assets/js/rangeslider.js');
    this.loadScript('assets/js/select2.min.js');
    this.loadScript('assets/js/owl.carousel.min.js');
   // this.loadScript('assets/js/custom.js');


  }

  loadCss(url: string) {
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    this.renderer.appendChild(document.head, link);
  }
  loadScript(url: string) {
    const script = this.renderer.createElement('script');
    script.src = url;
    this.renderer.appendChild(document.body, script);
  }

}
