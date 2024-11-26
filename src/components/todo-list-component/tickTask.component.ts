import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter, WritableSignal } from "@angular/core";
import { Task } from "./Task";
import { signal } from "@angular/core";
import { HttpService } from "../../services/http.service";
@Component({
    standalone:true,
    templateUrl:"./tickTask.component.html",
    selector: "tickTaskComponent",
    imports:[CommonModule]
})
export class TickTaskComponent{
    editable=false;
    httpService=new HttpService();
    @Input() task!:Task;
    @Input() allTasks!:WritableSignal<Task[]>;
    @Input() filter!:string;
    saveTask(title:string){
        if(!title)
            return;
        this.editable= false;
        this.task.title = title;
        console.log(this.allTasks());
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
}