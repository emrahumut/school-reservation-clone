import { Component, OnInit } from '@angular/core';

import { MetaService } from '@ngx-meta/core';
import { TranslatesService } from '@shared/translates';
import { UniversalStorage } from '@shared/storage/universal.storage';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  lang = window.navigator.language;

  constructor(
    private readonly meta: MetaService,
    private _translatesService: TranslatesService,
    private store: UniversalStorage
  ) {
    this.meta.setTag('og:title', 'home ctor');
    if (this.lang && this.lang.split('-')[0] && !this.store.getItem('langCode')) {
      this._translatesService.changeLang(this.lang.split('-')[0]);
    }
  }

  ngOnInit() {

  }
}
