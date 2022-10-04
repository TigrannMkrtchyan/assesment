import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.component.html',
  styleUrls: ['./user-tabs.component.scss'],
})
export class UserTabsComponent implements OnInit {
  activeTab!: string;
  userId!: string;
  tabs = [
    { tab: 'userInfo', name: 'User Info' },
    { tab: 'history', name: 'History' },
  ];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
    
    this.route.queryParams.subscribe((params)=>{
      this.activeTab = params['tab'];
    })
  }
}
