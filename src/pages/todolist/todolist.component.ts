import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task } from "../../components/todo-list-component/Task";
import { HttpService } from "../../services/http.service";
import { NgFor } from "@angular/common";
import { TickTaskComponent } from "../../components/todo-list-component/tickTask.component";
@Component({
    selector:"todolist",
    standalone:true,
    imports: [CommonModule, NgFor, TickTaskComponent],
    templateUrl:"./todolist.component.html"
})

export class ToDoListComponent{
    httpService = new HttpService();
    filter="all";
    task!:Task;
    allTasks = signal<Task[]>([]);
    newTaskTitle = signal<string>('');
    completedTasks= 0;
    incompletedTasks=0;
    
    handleInput(event:Event){
        const input = event?.target as HTMLInputElement;
        this.newTaskTitle.set(input?.value);
    }

    addNewTask(){
        if(this.newTaskTitle().trim().length){
            const newTask:Task={
                userID:1,
                id: Date.now(),
                title:this.newTaskTitle(),
                completed:false
            }
            this.allTasks.set([...this.allTasks(),newTask]);
            this.newTaskTitle.set("");
        }
    }

   
}