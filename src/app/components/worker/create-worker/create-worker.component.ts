import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Worker } from '../../../models/worker.model';
import { WorkerService } from '../../../services/worker.service';
import { LoaderComponent } from "../../shared/loader/loader.component";
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'create-worker',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, NgIf],
  styleUrl: './create-worker.component.css',
  templateUrl:'./create-worker.component.html',
})
export class CreateWorkerComponent {

  createWorkerForm: FormGroup;
  isLoading:boolean = false;

  constructor(
    formBuilder: FormBuilder, 
    private workerService: WorkerService, 
    private router: Router
  ){
    this.createWorkerForm = formBuilder.group({
      firstName:['', [Validators.required]],
      lastName:[''],
      phoneNumber:['',[Validators.required]]
    })
  }

  async addWorker(){
    this.isLoading = true;
    const worker: Worker = this.createWorkerForm.value;
    await this.workerService.addWorker(worker);
    this.createWorkerForm.reset();
    this.isLoading = false;
    alert("Worker created successfully");
    this.router.navigate(['/workers']);
  }

}
