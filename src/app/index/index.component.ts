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

  ngOnInit() {
    this.dataGet$.subscribe(
      x => {
        this.dataGet = x.data.map(f => f);
      }
    );
  }

  addOne() {
    const content = {
      data: [{
        id: '1',
        name: '馬達123',
        pointGet: '0',
        pointRank: '0'
      }],
      description: [
        {
          relationId: '1',
          content: '',
          pointNeed: '5',
          ableId: [
            '1'
          ]
        }
      ],
      leaderboard: []
    };

    this.dataPost$ = this.dataService.postMyData(JSON.stringify(content)).subscribe();

  }

}
