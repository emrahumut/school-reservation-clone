import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SearchSidenavService } from '@shared/services/search-sidenav.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  @ViewChild('rightSidenav', { static: true }) public rightSidenav: MatSidenav;
  schools = [];
  weeks = [];
  selectedSchools: any;
  selectedWeek: any;

  constructor(private sidenavService: SearchSidenavService) {
  }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.rightSidenav);
  }

  sidenavOpen() {
    this.schools = this.sidenavService.schools.getValue();
    this.weeks = this.sidenavService.weeks.getValue();
    this.selectedSchools = this.sidenavService.selectedSchools.getValue();
    this.selectedWeek = this.sidenavService.selectedWeek.getValue();
  }

  sidenavSearch() {
    this.sidenavService.selectedSchools.next(this.selectedSchools);
    this.sidenavService.selectedWeek.next(this.selectedWeek);
    this.sidenavService.searchTriger.next(true);
    this.rightSidenav.close();
  }

  gotoContact() {
    window.open('https://maltavista.com.tr/iletisim', '_blank');
  }

}
