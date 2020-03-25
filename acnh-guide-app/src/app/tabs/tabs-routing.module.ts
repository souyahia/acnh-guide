import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'fishTab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../fishTab/fishTab.module').then(m => m.FishTabPageModule)
          }
        ]
      },
      {
        path: 'insectTab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../insectTab/insectTab.module').then(m => m.InsectTabPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/fishTab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/fishTab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
