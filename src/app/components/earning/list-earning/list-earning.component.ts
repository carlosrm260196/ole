import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Earning } from '../../../models/earning.model';
import { EarningService } from '../../../services/earning.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list-earning',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './list-earning.component.html',
  styleUrl: './list-earning.component.css',
})
export class ListEarningComponent implements OnInit {
  earnings: Earning[] = [];
  isLoading:boolean = false;

  constructor(private earningService:EarningService){}
  
  ngOnInit(): void {
    this.loadEarnings()
  }

  async loadEarnings(){
    this.isLoading = true;
    try {
      this.earnings = await this.earningService.getEarnings();
      console.log(this.earnings)
    } catch (error) {
      console.error('Error fetching earnings:', error);
    }finally{
      this.isLoading = false;
    }
  }

}
