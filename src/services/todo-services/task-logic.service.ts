import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '../../components/todo-list-component/Task';
import { HttpService } from '../http.service';
import { OnInit } from '@angular/core';
@Injectable({providedIn: 'root'})
export class TaskService{
    private allTasks=signal<Task[]>([]);
    private httpService = new HttpService();
    private filter=signal<string>('all');
    constructor() {

    }
    async getAllTasks(){
        try{
            const dataFetched:any = (await this.httpService.get("https://jsonplaceholder.typicode.com/todos?userId=1")).data;
            await this.allTasks.set(dataFetched);
        }catch(error){
            console.error(error);
        }
        return this.allTasks;
    }
    getFilter(){
        return this.filter;
    }
    addNewTask(taskTitle:WritableSignal<string>){
        const newTask:Task={
            userId:1,
            title:taskTitle(),
            id:Date.now(),
            completed:false
        }
        this.allTasks.set([newTask,...this.allTasks()]);
        try{
            this.httpService.patch("https://jsonplaceholder.typicode.com/todos?userId=1",newTask,{
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                }
            });
        }catch(error){
            console.error(error);
        }
    }
    deleteTask(id:number){
        const updatedTask = this.allTasks().filter((task:Task)=> task.id!=id);
        this.allTasks.set(updatedTask);
        try{
            this.httpService.delete(`https://jsonplaceholder.typicode.com/todos?id=${id}`);
        }catch(err){
            console.error(err);
        }
    }
    saveTask(title:string, task:Task){
        if(!title)
            return false;

        task.title = title;
        return true;
    }
}