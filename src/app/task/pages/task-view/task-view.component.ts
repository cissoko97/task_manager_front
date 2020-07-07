import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { List, Task } from '../../models';
import { MatDialog } from '@angular/material';
import { EditListModalComponent } from '../../components/edit-list-modal/edit-list-modal.component';
import { ToastrService } from 'ngx-toastr';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  listId: string;
  listArray: Array<List>;
  tasks: Array<Task>;
  // tslint:disable-next-line: max-line-length
  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private toastService: ToastrService, private authService: AuthService) {
  }

  ngOnInit() {
    this.taskService.getList().subscribe((lists: Array<List>) => {
      this.listArray = lists;
      console.log(lists);
    }, error => {
      console.log(error);
    });

    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        // {this.listId} = ...params;
        const { listId } = params;
        this.listId = listId;
        this.taskService.getTasks(params.listId).subscribe((tasks: Array<Task>) => {
          this.tasks = tasks;
        });
      }
    });

  }

  completeTask(task: Task) {
    // set the tasks to completed
    this.taskService
      .completeTask(this.listId, task._id, task)
      .subscribe(() => {
        task.complete = !task.complete;
      });
  }

  deleteList() {

    // Performs delete List
    this.taskService.deleteList(this.listId).subscribe((res) => {
      const removeIndex = this.listArray.findIndex((list) => list._id === this.listId);
      this.listArray.splice(removeIndex, 1);
      let redirectList = this.listArray[removeIndex];
      // process du redirect the user after delate one task!!!
      if (redirectList) {
        this.router.navigate([`../../lists/${redirectList._id}`], { relativeTo: this.route });
      } else if (this.listArray[removeIndex - 1]) {
        redirectList = this.listArray[removeIndex - 1];
        this.router.navigate([`../../lists/${redirectList._id}`], { relativeTo: this.route });
      } else {
        this.router.navigate([`../../lists`], { relativeTo: this.route });
      }

    }, (error) => {
      console.log(error);
    }, () => {
      console.log('Ok Well process!!');
    });
  }

  editList() {
    // Performs delete List
    const data: List = this.listArray.find((list) => list._id === this.listId);
    const dialogRef = this.dialog.open(EditListModalComponent, {
      width: '500px',
      data: { ...data, flag: 'list' },
    });

    dialogRef.afterClosed().subscribe(
      (result: List) => {
        // check if result has a values
        if (result) {
          // replace the items on a array
          this.taskService.updateList(result._id, { ...result })
            .subscribe(res => {
              data.title = result.title;
              this.toastService.success('Update List');
            });
        }
      }
    );
  }

  editTask(task: Task) {
    // Perform process to edit task

    const data: Task = this.tasks.find((value) => value._id === task._id);
    const dialogRef = this.dialog.open(EditListModalComponent, {
      width: '500px',
      data: { ...data, flag: 'task' },
    });

    dialogRef.afterClosed().subscribe(
      (result: Task) => {
        // check if result has a values
        if (result) {
          // replace the items on a array
          this.taskService.updateList(result._id, { ...result })
            .subscribe(res => {
              data.title = result.title;
              this.toastService.success('Update Task');
            });
        }
      }
    );
  }

  deleteTask(taskId: string) {
    // Perform process to update Task
    this.taskService.deleteTask(this.listId, taskId).subscribe(res => {
      this.tasks = this.tasks.filter(value => value._id !== taskId);
    });
  }

  showStats() {
    this
      .taskService
      .getChartBarData()
      .subscribe((res: any) => {

        this.dialog.open(DashboardComponent, {
          data: res,
          width: '800px',
          height: '500px'
        });
      });
  }

  logOut() {
    this.authService.logout();
  }
}
