import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatSidenavModule,
    MatIconModule,
    NgSelectModule,
    FormsModule,
    ScrollToModule.forRoot()
  ],
  declarations: [
    FooterComponent,
    SidebarComponent,
    ToolbarComponent,
    WrapperComponent
  ],
  exports: [
    FooterComponent,
    SidebarComponent,
    ToolbarComponent,
    WrapperComponent
  ],
})
export class LayoutsModule { }
