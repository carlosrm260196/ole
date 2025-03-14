import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { WorkerService } from '../../../services/worker.service';
import { NgFor } from '@angular/common';
import { Worker } from '../../../models/worker.model';
import { EarningService } from '../../../services/earning.service';
import { Earning } from '../../../models/earning.model';

@Component({
  selector: 'create-earning',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './create-earning.component.html',
  styleUrl: './create-earning.component.css',
})
export class CreateEarningComponent implements OnInit {

  createEarningForm:FormGroup;
  workers:Worker[] = [];


  constructor(
    formBuilder:FormBuilder, 
    private workerService:WorkerService, 
    private earningService: EarningService
  ){
    this.createEarningForm = formBuilder.group({
      workerId:[''],
      creationDate:[''],
      totalAmount:[''],
    });
  }

  ngOnInit(): void {
    this.getWorkers();
  }

  async getWorkers(){
    try {
      this.workers = await this.workerService.getWorkers()
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  }

  createEarning(){
    const earning: Earning = this.createEarningForm.value;
    this.earningService.addEarning(earning)
  }

}
