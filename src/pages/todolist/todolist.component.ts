import { Component, signal, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task } from "../../components/todo-list-component/Task";
import { HttpService } from "../../services/http.service";
import { TickTaskComponent } from "../../components/todo-list-component/tickTask.component";
import { OnInit } from "@angular/core";
import { TaskService } from "../../services/todo-services/task-logic.service";
@Component({
    selector:"todolist",
    standalone:true,
    imports: [CommonModule,TickTaskComponent],
    templateUrl:"./todolist.component.html"
})

export class ToDoListComponent implements OnInit{
    
    taskService= new TaskService();
    httpService = new HttpService();
    filter!:WritableSignal<string>;
    task!:Task;
    allTasks!:WritableSignal<Task[]>;
    newTaskTitle = signal<string>('');
    completedTasks= 0;
    incompletedTasks=0;
    async ngOnInit() {
       this.allTasks = await this.taskService.getAllTasks();
       this.filter= await this.taskService.getFilter();
    }
    handleInput(event:Event){
        const input = event?.target as HTMLInputElement;
        this.newTaskTitle.set(input?.value);
    }

    addNewTask(){
        if(this.newTaskTitle().trim().length){
            this.taskService.addNewTask(this.newTaskTitle);
            this.newTaskTitle.set("");
        }else{
           
        }
    }

   
}