import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { WrapperComponent } from '@shared/layouts/wrapper/wrapper.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { UnAuthGuard } from '@shared/guards/un-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {
  //   path: 'auth',
  //   loadChildren: './auth/auth.module#AuthModule',
  //   canLoad: [UnAuthGuard],
  // },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'schools', loadChildren: './schools/schools.module#SchoolsModule' },
      { path: 'terms-conditions', loadChildren: './static-page/static-page.module#StaticPageModule' },
      { path: 'privacy', loadChildren: './static-page/static-page.module#StaticPageModule' }
    ],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: '**', loadChildren: './not-found/not-found.module#NotFoundModule' }],
  },
];
// must use {initialNavigation: 'enabled'}) - for one load page, without reload
export const AppRoutes = RouterModule.forRoot(routes, {
  initialNavigation: 'enabled',
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
});
