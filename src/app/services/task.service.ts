import { Injectable } from '@angular/core';
import { Task } from '../Tasks';
import { TASKS } from '../mock-tasks';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:5000/tasks';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  deleteTasks(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  toggleTask(task: Task): Observable<Task[]> {
    const url = `${this.baseUrl}/${task.id}`;

    return this.http.put<Task[]>(url, task, httpOptions);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task, httpOptions);
  }
}
