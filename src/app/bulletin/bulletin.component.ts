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
  dataGift = [];
  viewGift = [];

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
        this.dataGift = x.data.map(f => f);
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
    const oneData = this.dataGift.sort(x => {
      return Math.random() > 0.5 ? -1 : 1;
    });
    // 將抽出的資料放到 dataView
    this.viewGift.push(oneData[0]);
    // 比對 dataGift 資料刪除，避免抽到重複的
    this.dataGift.splice(0, 1);
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

  selectAllRandom(name: string) {
    // -----dataGet 做為剩餘的資料-----
    // 抽出一筆資料，這邊是淺拷貝
    let oneData = this.dataGift.map(x => x);
    const index = oneData.findIndex(x => x.name === name);
    if (oneData.length !== 1) {
      oneData.splice(index , 1);
    }
    oneData = oneData.sort(x => {
      return Math.random() > 0.5 ? -1 : 1;
    });
    // 將抽出的資料放到 dataGet
    const pushIndex = this.dataGet.findIndex(x => x.name === name);
    this.dataGet[pushIndex].compareName = oneData[0].name;

    // 刪除資料
    const deleteIndex = this.dataGift.findIndex(x => x.name === oneData[0].name);
    this.dataGift.splice(deleteIndex, 1);
  }

  selectSingleRandom(name: string, selectName: string) {
    // 將抽出的資料放到 dataView
    const pushIndex = this.dataGet.findIndex(x => x.name === name);
    this.dataGet[pushIndex].compareName = selectName;
    // 比對 dataGift 資料刪除，避免抽到重複的
    const deleteIndex = this.dataGift.findIndex(x => x.name === selectName);
    this.dataGift.splice(deleteIndex, 1);
  }

}
