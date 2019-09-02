import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})

export class TitleComponent implements OnInit {
  @Input () parentVal: any;
  constructor(public nav: NavController) { }
  ngOnInit() {}
  canGoBack() {
    if (window.location.href.includes('/real-name-result')) {
      this.nav.navigateForward('/tabs/tab1');
    } else {
      this.nav.back();
    }
  }
}
