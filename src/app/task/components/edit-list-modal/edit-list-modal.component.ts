import { Component, OnInit, Inject } from '@angular/core';
import { List } from '../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-edit-list-modal',
  templateUrl: './edit-list-modal.component.html',
  styleUrls: ['./edit-list-modal.component.scss']
})
export class EditListModalComponent implements OnInit {
  listForm = this.fb.group({
    title: [this.data.title, [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    public dialogRef: MatDialogRef<EditListModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // this.taskService
    // .updateList(this.data._id, this.listForm.value)
    // .subscribe((res: List) => {
    this.data.title = this.listForm.get('title').value;
    this.dialogRef.close(this.data);
    // });
  }
}
