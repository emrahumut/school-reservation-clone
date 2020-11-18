import { ModuleWithProviders, NgModule } from '@angular/core';

import { TransferHttpModule } from '@gorniv/ngx-universal';

import { LayoutsModule } from './layouts/layouts.module';
import { SharedMetaModule } from './shared-meta';
import { SharedFormsModule } from '@shared/shared-forms/shared-forms.module';
import { SearchSidenavService } from './services/search-sidenav.service';
import { ComponentsModule } from './components/components.module';

@NgModule({
  exports: [LayoutsModule, SharedMetaModule, TransferHttpModule, ComponentsModule],
  providers: [SearchSidenavService],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModule };
  }
}
