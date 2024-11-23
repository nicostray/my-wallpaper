import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'category',
        loadChildren: () =>
          import('./category/category.module').then(
            (m) => m.CategoryPageModule
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'favorite',
        loadChildren: () =>
          import('./favorite/favorite.module').then(
            (m) => m.FavoritePageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'subscription',
        loadChildren: () => import('./subscription/subscription.module').then( m => m.SubscriptionPageModule)
      },
      { path: '', redirectTo: '/tabs/home', pathMatch: 'full' },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
