import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'task', loadChildren: () => import('./task/task.module').then(m => m.TaskModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    , {
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
