import { CommonModule } from "@angular/common";
import { Component, Input, WritableSignal, OnInit } from "@angular/core";
import { Task } from "./Task";
import { TaskService } from "../../services/todo-services/task-logic.service";


@Component({
    standalone:true,
    templateUrl:"./tickTask.component.html",
    selector: "tickTaskComponent",
    imports:[CommonModule]
})
export class TickTaskComponent implements OnInit{

    @Input() task!:Task;
    @Input() taskService!:TaskService;
    editable=false;
    filter!:WritableSignal<string>;
    async ngOnInit() {
        this.filter= await this.taskService.getFilter();
    }
    
    saveTask(title:string, task:Task){
        if(this.taskService.saveTask(title,task))
            this.editable= false;
        
 
    }
    deleteTask(id:number){
        this.taskService.deleteTask(id);
    }
    
}