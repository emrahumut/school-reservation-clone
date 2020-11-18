import { Component, OnInit, HostListener } from '@angular/core';
import { SearchSidenavService } from '@shared/services/search-sidenav.service';
import { UniversalStorage } from '@shared/storage/universal.storage';
import { DataService } from '@shared/services/data.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormModalComponent } from './form-modal/form-modal.component';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class SchoolsComponent implements OnInit {
  schools = [];
  weeks = [];
  selectedSchools: any;
  selectedWeeks: any;
  schoolsData: any;
  openMap: boolean = false;
  lang: string = '';
  sortCheck: string = 'popularSort';

  constructor(
    private sidenav: SearchSidenavService,
    private _universalStorage: UniversalStorage,
    private dataService: DataService,
    private location: Location,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.langCode.subscribe(langCode => {
      this.lang = this._universalStorage.getItem('langCode') ? this._universalStorage.getItem('langCode') : 'en';
      this.dataService.getSchools(this.lang).toPromise().then((res: []) => {
        if (res && res.length > 0) {
          this.schools = res;
          this.weeks = this.dataService.findWeeks(res);
          this.sidenav.schools.next(this.schools);
          this.sidenav.weeks.next(this.weeks);
          this.findSchoolAndWeek();
        }
      });
    });
    this.sidenav.searchTriger.subscribe(res => {
      if (res) {
        this.selectedSchools = this.sidenav.selectedSchools.getValue();
        this.selectedWeeks = this.sidenav.selectedWeek.getValue();
        this.search();
      }
    });
  }

  toggleRightSidenav() {
    this.sidenav.selectedWeek.next(this.selectedWeeks);
    this.sidenav.selectedSchools.next(this.selectedSchools);
    this.sidenav.toggle();
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
      this.route.snapshot.queryParams = {
        names: `${schoolsName}`,
        weeks: `${weeksName}`
      };
      this.findSchoolAndWeek();
    }
  }

  findSchoolAndWeek() {
    const params = this.route.snapshot.queryParams;
    if (params) {
      if (params['weeks'].split(',').length > 0) {
        const weekTemp = [];
        params['weeks'].split(',').forEach(count => {
          weekTemp.push(this.weeks.find(x => x['weekCount'] === (count)));
        });
        this.selectedWeeks = weekTemp;
      } else {
        this.selectedWeeks = this.weeks.find(x => x['weekCount'] === (name));
      }

      if (params['names'].split(',').length > 0) {
        const schoolTemp = [];
        params['names'].split(',').forEach(name => {
          schoolTemp.push(this.schools.find(x => x['shortName'] === (name)));
        });
        this.selectedSchools = schoolTemp;
      } else {
        this.selectedSchools = this.schools.find(x => x['shortName'] === (name));
      }

      const result: any = [];
      this.selectedSchools.forEach(school => {
        this.selectedWeeks.forEach(week => {
          const currentWeek = school['prices'].findIndex(x => x['weekCount'] === week['weekCount']);
          if (currentWeek !== -1) {
            result.push({ school: school, week: school['prices'][currentWeek] });
          }
        });
      });

      this.schoolsData = result;
      this.popularSort();

      if (this.openMap) {
        this.openMap = false;
        setTimeout(() => {
          this.openMap = true;
        }, 100);
      }
    }

  }

  popularSort() {
    this.sortCheck = 'popularSort';
    this.schoolsData.sort((a, b) => (Number(a.school.popularity) > Number(b.school.popularity)) ? 1 : -1);
  }

  priceSort() {
    this.sortCheck = 'priceSort';
    this.schoolsData.sort((a, b) => (Number(a.week.discountedPrice) > Number(b.week.discountedPrice)) ? 1 : -1);
  }

  openForm(item: any): void {
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '435px',
      maxWidth: '95vw',
      data: { shortName: item.school.shortName, weekName: item.week.weekName, price: item.week.discountedPrice }
    });
    dialogRef.componentInstance.type = 'bookingForm';
  }

}
