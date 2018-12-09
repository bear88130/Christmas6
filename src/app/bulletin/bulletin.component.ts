import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit, OnDestroy {

  constructor(private dataservice: DataServiceService) { }
  dataGet$ = this.dataservice.getMyData();
  dataGet = [];
  dataAll = [];
  dataView = [];

  get dataRank() {
    const newData = this.dataGet.map(x => x);
    const rankData = newData.sort((a, b) => b.pointGet - a.pointGet);
    return rankData;
  }

  ngOnInit() {
    this.initData();
  }

  ngOnDestroy() {

  }

  initData() {
    this.dataGet$.subscribe(
      x => {
        this.dataGet = x.data.map(f => f);
        this.dataAll = x.data.map(f => f);
      }
    );
  }

  clearAll() {
    this.dataGet = [];
    this.dataView = [];
  }

  // 剩餘資料做隨機亂序
  rankAll() {
    // dataGet 做為剩餘的資料
    const allData = this.dataGet.sort(x => {
      return Math.random() > 0.5 ? -1 : 1;
    }
    );
    // dataView 做為顯示資料使用
    this.dataView = this.dataView.concat(allData);
    // this.dataGet 全部刪除
    this.dataGet.length = 0;
  }

  // 剩餘資料隨機單一排序
  rankSingle() {
    // -----dataGet 做為剩餘的資料-----
    // 抽出一筆資料，這邊是淺拷貝
    const oneData = this.dataGet.sort(x => {
      return Math.random() > 0.5 ? -1 : 1;
    });
    // 將抽出的資料放到 dataView
    this.dataView.push(oneData[0]);
    // 比對 dataGet 資料刪除，避免抽到重複的
    this.dataGet.splice(0, 1);
  }

  rankClear() {
    this.clearAll();
    this.initData();
  }

  // 移動到 dataView
  // moveView(id: string) {
  //   const index = this.dataGet.findIndex(x => x.id === id);
  //   this.dataView.push(this.dataGet[index]);
  //   this.dataGet.splice(index, 1);
  // }

}
