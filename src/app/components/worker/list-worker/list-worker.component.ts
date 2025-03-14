import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'list-worker',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './list-worker.component.html',
  styleUrl: './list-worker.component.css',
})
export class ListWorkerComponent implements OnInit{ 

  workers:any[] = [];
  isLoading:boolean = true;

  constructor(private workerService:WorkerService){}
  
  ngOnInit(): void {
    this.loadWorkers();
  }

  async loadWorkers(): Promise<void> {
    this.isLoading = true;

    try {
      this.workers = await this.workerService.getWorkers();      
    } catch (error) {
      console.error('Error fetching workers:', error);
    }finally{
      this.isLoading = false;
    }
  }

  

}