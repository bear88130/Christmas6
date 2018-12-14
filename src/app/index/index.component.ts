import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor(private dataService: DataServiceService) {
  }

  dataGet$ = this.dataService.getMyData();
  dataGet = [];
  dataPost$;
  dataPost;
  viewData = [];

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.dataGet$.subscribe(
      x => {
        this.dataGet = x.data.map(f => f);
      }
    );

  }

  radom() {
  this.initData();
  this.viewData = this.dataGet.sort(x => {
      return Math.random() > 0.5 ? -1 : 1;
    }
    );
  }

  clear() {
    this.viewData.length = 0;
  }


}
