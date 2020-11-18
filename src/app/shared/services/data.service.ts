import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    langCode = new BehaviorSubject<any>('');
    // getlangCode = this.langCode.asObservable();

    constructor(private http: HttpClient) {
    }

    /**
     * get schools from API
     * @param lang current language
     */
    getSchools(lang: string) {
        return this.http.get(`${environment.apiURL}/${lang}-schools?active=true&_sort=popularity:ASC`).pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * find week in schools array
     * @param data schools array
     */
    findWeeks(data: []) {
        const weeks = [];
        data.forEach(school => {
            const tempWeeks: [] = school['prices'];
            tempWeeks.forEach(week => {
                if (!weeks.find(x => x.weekCount === week['weekCount'])) {
                    weeks.push(week);
                }
            });
        });
        return weeks;
    }

    getPage(lang: string, url: string) {
        url === 'privacy' ? url = 'privacies' : url = url;
        return this.http.get(`${environment.apiURL}/${lang}-${url}`).pipe(
            map(res => {
                return res;
            })
        );
    }

    sendForm(formValue: any, lang: string) {
        let postUrl: string;
        if (lang === 'en') {
            postUrl = `https://api.jotform.com/form/200482040357042/submissions?apiKey=8e5ac4f24bcdc2b8427ebea17a089f8b&submission[3]=${formValue.nameSurname}&submission[4]=${formValue.country}&submission[5]=${formValue.birthDate}&submission[6]=${formValue.mobile}&submission[7]=${formValue.email}&submission[8]=${formValue.shortName}&submission[9]=${formValue.weekName}&submission[10]=${formValue.price}`;
        } else {
            postUrl = `https://api.jotform.com/form/200481154725046/submissions?apiKey=8e5ac4f24bcdc2b8427ebea17a089f8b&submission[3]=${formValue.nameSurname}&submission[4]=${formValue.mobile}&submission[5]=${formValue.email}&submission[6]=${formValue.birthDate}&submission[7]=${formValue.shortName}&submission[8]=${formValue.weekName}&submission[9]=${formValue.price}`;
        }
        return this.http.post(postUrl, {}).pipe(
            map(res => {
                return res;
            })
        );
    }
}

