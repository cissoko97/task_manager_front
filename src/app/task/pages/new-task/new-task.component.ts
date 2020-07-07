import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/service/task.service';
import { Task } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId: string;
  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor(private fb: FormBuilder, private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('listId');
  }

  createTask() {
    this.taskService.createTasks(this.listId, this.taskForm.value).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
