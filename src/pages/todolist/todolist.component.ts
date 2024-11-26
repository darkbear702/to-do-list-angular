import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task } from "../../components/todo-list-component/Task";
import { HttpService } from "../../services/http.service";
import { NgFor } from "@angular/common";
import { TickTaskComponent } from "../../components/todo-list-component/tickTask.component";
import { OnInit } from "@angular/core";
@Component({
    selector:"todolist",
    standalone:true,
    imports: [CommonModule, NgFor, TickTaskComponent],
    templateUrl:"./todolist.component.html"
})

export class ToDoListComponent implements OnInit{
    httpService = new HttpService();
    filter="all";
    task!:Task;
    allTasks = signal<Task[]>([]);
    newTaskTitle = signal<string>('');
    completedTasks= 0;
    incompletedTasks=0;
    async ngOnInit() {
        try{
            const dataFetched:any = (await this.httpService.get("https://jsonplaceholder.typicode.com/todos?userId=1")).data;
            await this.allTasks.set(dataFetched);
        }catch(error){
            console.error(error);
        }
    }
    handleInput(event:Event){
        const input = event?.target as HTMLInputElement;
        this.newTaskTitle.set(input?.value);
    }

    addNewTask(){
        if(this.newTaskTitle().trim().length){
            const newTask:Task={
                userId:1,
                id: Date.now(),
                title:this.newTaskTitle(),
                completed:false
            }
            this.allTasks.set([newTask,...this.allTasks()]);
            this.newTaskTitle.set("");
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
    }

   
}