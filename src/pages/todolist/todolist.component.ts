import { Component, signal, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task } from "../../components/todo-list-component/Task";
import { HttpService } from "../../services/http.service";
import { TickTaskComponent } from "../../components/todo-list-component/tickTask.component";
import { OnInit } from "@angular/core";
import { TaskService } from "../../services/todo-services/task-logic.service";
import { Input } from "@angular/core";
// import {ReactiveFormsModule} from '@angular/forms';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { ToastModule } from 'primeng/toast';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FormsModule } from '@angular/forms';
// import { BrowserModule } from "@angular/platform-browser";
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
    @Input() id='';
    async ngOnInit() {
        if(this.id){
            await this.taskService.setUserId(Number(this.id));
            this.allTasks = await this.taskService.getAllTasks();
            this.filter= await this.taskService.getFilter();
        }
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

//    confirm1(event:any){

//    }
//    confirm2(event:any){

//    }
}