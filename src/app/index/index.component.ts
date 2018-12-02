import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor(private dataService: DataServiceService) {
    this.dataGet$ = this.dataService.getMyData();
  }

  dataGet$;
  dataGet;

  ngOnInit() {
    this.dataGet$.subscribe(
      x => {
        this.dataGet = x;
      }
    );
  }

}
