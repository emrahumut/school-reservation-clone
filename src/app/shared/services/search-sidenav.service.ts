import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchSidenavService {
    private sidenav: MatSidenav;
    schools = new BehaviorSubject<any>('');
    weeks = new BehaviorSubject<any>('');
    selectedSchools = new BehaviorSubject<any>('');
    selectedWeek = new BehaviorSubject<any>('');
    searchTriger = new BehaviorSubject<any>('');

    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public open() {
        return this.sidenav.open();
    }

    public close() {
        return this.sidenav.close();
    }

    public toggle(): void {
        this.sidenav.toggle();
    }
}
