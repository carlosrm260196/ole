import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { WorkerService } from '../../../services/worker.service';
import { NgFor, NgIf } from '@angular/common';
import { Worker } from '../../../models/worker.model';
import { EarningService } from '../../../services/earning.service';
import { Earning } from '../../../models/earning.model';
import { LoaderComponent } from "../../shared/loader/loader.component";

@Component({
  selector: 'create-earning',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, LoaderComponent, NgIf],
  templateUrl: './create-earning.component.html',
  styleUrl: './create-earning.component.css',
})
export class CreateEarningComponent implements OnInit {

  createEarningForm: FormGroup;
  workers: Worker[] = [];
  isLoading: boolean = false;


  constructor(
    formBuilder:FormBuilder, 
    private workerService:WorkerService, 
    private earningService: EarningService,

  ){
    this.createEarningForm = formBuilder.group({
      workerId:[''],
      creationDate:[new Date().toISOString().substring(0, 10)],
      totalAmount:[''],
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getWorkers();
  }

  async getWorkers(){
    try {
      this.workers = await this.workerService.getWorkers()
    } catch (error) {
      alert('Error fetching workers');
    }finally{
      this.isLoading = false;
    }
  }

  async createEarning(){
    this.isLoading = true;
    const earning: Earning = this.createEarningForm.value;
    await this.earningService.addEarning(earning);
    this.createEarningForm.reset()
    this.isLoading = false;
    alert('Earning created successfully');
  }

}
