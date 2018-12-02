export interface DataModel {
  data: Setting[];
  description: Description[];
  leaderboard: any[];
}

export interface Description {
  relationId: string;
  content: string;
  pointNeed: string;
  ableId: string[];
}

export interface Setting {
  id: string;
  name: string;
  pointGet: string;
  pointRank: string;
}
