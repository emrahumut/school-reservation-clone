import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@shared/services/data.service';
import { TranslatesService } from '@shared/translates';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {
  currentLang: string;
  bookingForm: FormGroup;
  submit: boolean = false;
  type: string;

  constructor(
    public dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: DataService,
    private _translatesService: TranslatesService,
  ) {
    this.currentLang = this._translatesService.getCurrentLang();
  }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      nameSurname: ['', Validators.required],
      birthDate: ['', Validators.required],
      country: [''],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      shortName: [],
      weekName: [],
      price: []
    });
    if (this.currentLang === 'en') {
      this.bookingForm.controls['country'].setValidators(Validators.required);
    }
    if (this.data) {
      this.bookingForm.patchValue({ shortName: this.data.shortName, weekName: this.data.weekName, price: this.data.price });
    }
  }

  close(result?: boolean) {
    this.dialogRef.close();
  }

  sendForm() {
    this.submit = true;
    // if (this.bookingForm.valid) {
    //   this.dataService.sendForm(this.bookingForm.value, this.currentLang).toPromise().then(res => {
    //     if (res && res['responseCode']) {
    //       this.type = 'bookingConfirm';
    //     } else {
    //       this.type = 'bookingConfirm';
    //     }
    //   });
    // }
  }

}
