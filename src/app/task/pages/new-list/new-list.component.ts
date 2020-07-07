import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { List } from '../../models/List';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  listForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(private fb: FormBuilder, private router: Router, private taskService: TaskService) { }

  ngOnInit() {
  }

  createList() {
    this.taskService.createList(this.listForm.value).subscribe((list: List) => {
      console.log(list);
      this.router.navigateByUrl(`/task/lists/${list._id}`);
      // this.router.navigateByUrl(`/task/lists/${list._id}`);
    });

  }

  // onCheckChange(event) {
  //   const formArray: FormArray = this.listForm.get('choix') as FormArray;
  //   /* Selected */
  //   if (event.target.checked) {
  //     // Add a new control in the arrayForm
  //     formArray.push(new FormControl(event.target.value));
  //   } else {
  //     /* unselected */
  //     // find the unselected element
  //     const index = formArray.controls.findIndex((ctrl: AbstractControl) => ctrl.value === event.target.value);
  //     formArray.removeAt(index);
  //   }
  // }

}
