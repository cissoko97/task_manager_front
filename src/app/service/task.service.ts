import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Task } from '../task/models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequest: WebRequestService) {

  }

  // List Service Methods
  getList() {
    return this.webRequest.get('lists');
  }

  createList(payload: object) {
    return this.webRequest.post('lists', payload);
  }

  updateList(listId: string, payload: object) {
    return this.webRequest.patch(`lists/${listId}`, payload);
  }

  deleteList(listId: string) {
    return this.webRequest.delete(`lists/${listId}`);

  }

  // Task Service Methods
  getTasks(listId: string) {
    return this.webRequest.get(`lists/${listId}/tasks`);
  }

  createTasks(listId: string, payload: object) {
    return this.webRequest.post(`lists/${listId}/tasks`, payload);
  }

  deleteTask(listId: string, taskId: string) {
    return this.webRequest.delete(`lists/${listId}/tasks/${taskId}`);

  }

  updateTask(listId: string, taskId: string, payload: object) {
    return this.webRequest.patch(`lists/${listId}/tasks/${taskId}`, payload);
  }

  completeTask(listId: string, taskId: string, task: Task) {
    return this.webRequest.patch(`lists/${listId}/tasks/${taskId}`, {
      complete: !task.complete
    });
  }

  getChartBarData() {
    return this.webRequest.get(`chartline/data`);
  }
}
