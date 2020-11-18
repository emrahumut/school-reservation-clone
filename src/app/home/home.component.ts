import { Component, OnInit, HostListener } from '@angular/core';

import { MetaService } from '@ngx-meta/core';
import { UniversalStorage } from '@shared/storage/universal.storage';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DataService } from '@shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class HomeComponent implements OnInit {
  schools = [];
  weeks = [];
  selectedSchools: any = [];
  selectedWeeks: any = [];

  constructor(
    private readonly _meta: MetaService,
    private _universalStorage: UniversalStorage,
    private dataService: DataService,
    private location: Location,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this._meta.setTag('description', 'Meta update from init');
    this.dataService.langCode.subscribe(langCode => {
      this.getData();
    });
  }

  getData() {
    const lang = this._universalStorage.getItem('langCode') ? this._universalStorage.getItem('langCode') : 'en';
    this.dataService.getSchools(lang).toPromise().then((res: []) => {
      if (res && res.length > 0) {
        this.schools = res;
        this.weeks = this.dataService.findWeeks(res);
      }
    });
  }

  search() {
    if (this.selectedSchools.length > 0 && this.selectedWeeks.length > 0) {
      const schoolsName = [];
      const weeksName = [];
      this.selectedSchools.forEach(school => {
        schoolsName.push(school['shortName']);
      });
      this.selectedWeeks.forEach(week => {
        weeksName.push(week['weekCount']);
      });
      this.location.go('/schools', `names=${schoolsName}&weeks=${weeksName}`);
      location.reload();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    if ($event.target['scrollingElement'].scrollTop < 250) {
      this.router.navigateByUrl('/home');
    }
  }

}
