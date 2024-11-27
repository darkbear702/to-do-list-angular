import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
@Component({
    selector: 'todoListLogin',
    templateUrl: 'todolistlogin.component.html',
    imports: [CommonModule],
    standalone:true
})

export class TodolistLoginComponent implements OnInit {
    constructor(private router: Router) {}
    userId  = signal<number>(0);
    async ngOnInit() {

    }
    
    handleInput(event:Event){
        const input = event?.target as HTMLInputElement;
        this.userId.set(Number(input?.value));
    }
    navigate(){
        this.router.navigate([`/todolist/${this.userId()}`])
    }
}