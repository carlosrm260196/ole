import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Worker } from '../../../models/worker.model';
import { WorkerService } from '../../../services/worker.service';

@Component({
  selector: 'create-worker',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: './create-worker.component.css',
  templateUrl:'./create-worker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWorkerComponent {

  createWorkerForm:FormGroup;

  constructor(formBuilder:FormBuilder, private workerService:WorkerService){
    this.createWorkerForm = formBuilder.group({
      firstName:['', [Validators.required]],
      lastName:[''],
      phoneNumber:['',[Validators.required]]
    })
  }

  addWorker(){
    const worker:Worker = this.createWorkerForm.value;
    this.workerService.addWorker(worker);
    console.log(worker)
  }

}
