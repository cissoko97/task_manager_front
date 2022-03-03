import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './task.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';

const routes: Routes = [{
  path: '', component: TaskComponent, children: [
    { path: 'lists', component: TaskViewComponent , resolve : {} },
    { path: 'lists/:listId', component: TaskViewComponent },
    { path: 'new-list', component: NewListComponent },
    { path: 'lists/:listId/new-task', component: NewTaskComponent },
    { path: '', redirectTo: 'lists', pathMatch: 'full' }
    // { path: '**', redirectTo: 'task/lists', pathMatch: 'full' },
  ]
}];
// , { path: '**', redirectTo: 'lists/', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
