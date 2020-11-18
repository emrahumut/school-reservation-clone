import { Component, OnInit } from '@angular/core';
import { TranslatesService } from '@shared/translates';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '@shared/services/data.service';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.scss']
})
export class StaticPageComponent implements OnInit {
  public currentLang: string;
  result: any;

  constructor(
    private _translatesService: TranslatesService,
    private router: Router,
    private dataService: DataService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.dataService.langCode.subscribe(langCode => {
          this.currentLang = this._translatesService.getCurrentLang();
          if (event.url && event.url.split('/')[1]) {
            this.dataService.getPage(this.currentLang, event.url.split('/')[1]).toPromise().then((res) => {
              if (res) {
                this.result = res[0];
              }
            });
          }
        });
      }
    });
  }

  ngOnInit() {
  }

}
