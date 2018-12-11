import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from './admin/admin.component';
import { BulletinComponent } from './bulletin/bulletin.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'adminX', component: AdminComponent },
  { path: 'bulletin', component: BulletinComponent },
  { path: '**', component: BulletinComponent },
  { path: '', component: BulletinComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
