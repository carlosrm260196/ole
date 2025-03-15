import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker.model';
import { NgFor, NgIf } from '@angular/common';
import { LoaderComponent } from "../../shared/loader/loader.component";

@Component({
  selector: 'list-worker',
  standalone: true,
  imports: [NgFor, NgIf, LoaderComponent],
  templateUrl: './list-worker.component.html',
  styleUrl: './list-worker.component.css',
})
export class ListWorkerComponent implements OnInit{ 

  workers:Worker[] = [];
  isLoading:boolean = true;

  constructor(private workerService:WorkerService){}
  
  ngOnInit(): void {
    this.loadWorkers();
  }

  async loadWorkers(): Promise<void> {
    this.isLoading = true;

    try {
      this.workers = await this.workerService.getWorkers();
      this.workers.sort((a, b) => a.lastName.localeCompare(b.lastName));      
    } catch (error) {
      alert('Error fetching workers');
    }finally{
      this.isLoading = false;
    }
  }

  

}