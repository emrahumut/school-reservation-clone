import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material';

import { TranslatesService, ILang } from '@shared/translates';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '@shared/services/data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public langList$: Observable<ILang[]>;
  public currentLang: string;
  @Input() sidenavMenu: MatSidenav;
  headerType = 'public';
  isSticky: boolean = false;

  constructor(
    private _translatesService: TranslatesService,
    private router: Router,
    private dataService: DataService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.langList$ = this._translatesService.getLangList();
        this.currentLang = this._translatesService.getCurrentLang();
        if (event.url && event.urlAfterRedirects === '/home') {
          this.headerType = 'public';
        } else {
          this.headerType = 'schools';
        }
      }
    });
  }

  ngOnInit(): void {

  }

  public changeLang(code: string): void {
    this._translatesService.changeLang(code);
    this.dataService.langCode.next(code);
  }


  sideNavOpen(param) {
    param.toggle();
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 5;
  }

}
