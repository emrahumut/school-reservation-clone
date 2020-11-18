import { Component } from '@angular/core';
import { UniversalStorage } from '@shared/storage/universal.storage';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  showCookieConsent: boolean = true;

  constructor(private _universalStorage: UniversalStorage, ) {
    this.checkCookieStatus();
  }

  acceptCookie() {
    this._universalStorage.setItem('cookieConsent', 'true');
    this.checkCookieStatus();
  }

  checkCookieStatus() {
    if (this._universalStorage.getItem('cookieConsent')) {
      this.showCookieConsent = false;
    } else {
      this.showCookieConsent = true;
    }
  }

}
