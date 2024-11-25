import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter, WritableSignal } from "@angular/core";
import { Task } from "./Task";
import { signal } from "@angular/core";
@Component({
    standalone:true,
    templateUrl:"./tickTask.component.html",
    selector: "tickTaskComponent",
    imports:[CommonModule]
})
export class TickTaskComponent{
    editable=false;
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
    }
}