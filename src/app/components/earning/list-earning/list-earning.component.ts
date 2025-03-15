import { Component, OnInit } from '@angular/core';
import { Earning } from '../../../models/earning.model';
import { EarningService } from '../../../services/earning.service';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Worker } from '../../../models/worker.model';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { WorkerService } from '../../../services/worker.service';
import { LoaderComponent } from "../../shared/loader/loader.component";

@Component({
  selector: 'app-list-earning',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, CurrencyPipe, DatePipe, LoaderComponent],
  templateUrl: './list-earning.component.html',
  styleUrl: './list-earning.component.css',
})
export class ListEarningComponent implements OnInit {
  earnings: Earning[] = [];
  isLoading: boolean = false;
  workers: Worker[] = []
  filterForm: FormGroup;
  totalEarnings: number = 0;

  constructor(
    private earningService : EarningService,
    private workerService: WorkerService,
    formBuilder:FormBuilder
  ){
    this.filterForm = formBuilder.group({
      workerId:[''],
      startDate:[''],
      endDate:['']
    })
    this.getWorkers();
  }
  
  ngOnInit(): void {
    this.loadEarnings()
  }

  async getWorkers(){
    try {
      this.workers = await this.workerService.getWorkers();      
    } catch (error) {
      alert('Error fetching workers');
    }
  }

  async loadEarnings(){
    this.isLoading = true;
    try {
      this.earnings = await this.earningService.getEarnings();
      this.earnings.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());
      this.calculateTotal();
    } catch (error) {
      alert('Error fetching earnings');
    }finally{
      this.isLoading = false;
    }
  }

  filterEarnings(){
    const start = this.filterForm.controls['startDate'].value ? new Date(this.filterForm.controls['startDate'].value) : null;
    const end = this.filterForm.controls['endDate'].value ? new Date(this.filterForm.controls['endDate'].value) : null;
    const workerId = this.filterForm.controls['workerId'].value;
  
    this.earnings = this.earnings.filter(earning => {
      let dateValid = true;
      let workerValid = true;
  
      if (start && end) {
        dateValid = new Date(earning.creationDate) >= start && new Date(earning.creationDate) <= end;
      } else if (start) {
        dateValid = new Date(earning.creationDate) >= start;
      } else if (end) {
        dateValid = new Date(earning.creationDate) <= end;
      }
  
      if (workerId) {
        workerValid = earning.workerId === workerId;
      }
      return dateValid && workerValid;
    });
    this.earnings.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());
    this.calculateTotal();
  }

  clearFilter(){
    this.filterForm.reset();
    this.calculateTotal();
    this.loadEarnings();
  }

  calculateTotal() {
    this.totalEarnings = this.earnings.reduce((sum, earning) => sum + earning.totalAmount, 0);
  }
  

}
