import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task } from "../../components/todo-list-component/Task";
import { TickTaskComponent } from "../../components/todo-list-component/tickTask.component";
@Component({
    selector:"todolist",
    standalone:true,
    imports: [CommonModule, TickTaskComponent],
    templateUrl:"./todolist.component.html"
})

export class ToDoListComponent{
    filter="all";
    task!:Task;
    allTasks=[
        {
            description:"Make a to-do-list :>",
            done:false
        },
        {
            description:"Sleep",
            done:false
        },
        {
            description:"Eat",
            done:false
        }
    ]
    addTask(description:string){
        if(!description) return;
        this.allTasks.unshift({
            description,
            done:false
        });
    }
    remove(task:Task){
        this.allTasks.splice(this.allTasks.indexOf(task),1);
    }
    get tasks() {
        if(this.filter==="all")
          return this.allTasks;
        if(this.filter==="done")
            return this.allTasks.filter((task)=>task.done===true);
        else
            return this.allTasks.filter((task)=>task.done===false);
    }
    get finishedTasks(){
        let count=0;
        for(let i = 0; i<this.allTasks.length;i++){
            if(this.allTasks[i].done==true){
                count++;
            }
        }
        return count;
    }
    get unfinishedTasks(){
        return (this.allTasks.length - this.finishedTasks);
    }
    
}