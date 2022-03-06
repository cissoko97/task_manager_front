import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { EditListModalComponent } from './components/edit-list-modal/edit-list-modal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TaskComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    EditListModalComponent,
    DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    TaskRoutingModule,
    NgxEchartsModule.forRoot({
      echarts
    })
  ],
  entryComponents: [
    EditListModalComponent,
    DashboardComponent
  ],
  exports: [
  ]
})
export class TaskModule { }
