import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Task } from "./Task";

@Component({
    standalone:true,
    templateUrl:"./tickTask.component.html",
    selector: "tickTaskComponent",
    imports:[CommonModule]
})
export class TickTaskComponent{
    editable=false;
    @Input() task!:Task;
    @Output() remove= new EventEmitter<Task>();
    saveTask(description:string){
        if(!description)
            return;
        this.editable= false;
        this.task.description = description;
    }
}