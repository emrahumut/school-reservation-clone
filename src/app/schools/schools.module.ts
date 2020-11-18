import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsRoutingModule } from './schools-routing.module';
import { SchoolsComponent } from './schools.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material';
import { ThanksPageComponent } from './thanks-page/thanks-page.component';


@NgModule({
  declarations: [SchoolsComponent, MapComponent, FormModalComponent, ThanksPageComponent],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    NgSelectModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule
  ],
  entryComponents: [FormModalComponent]
})
export class SchoolsModule { }
