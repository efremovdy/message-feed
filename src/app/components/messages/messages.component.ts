import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ApiService } from '../../api.service';
import { MessageModel } from '../../models/message-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less']
})
export class MessagesComponent implements OnInit, OnDestroy {
  public messages: MessageModel[] = [];
  public dataSource: MatTableDataSource<MessageModel> = new MatTableDataSource();
  public obs: Observable<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getMessages().subscribe((messages: MessageModel[]) => {
      this.messages = messages.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

      this.dataSource = new MatTableDataSource(this.messages);
      this.dataSource.paginator = this.paginator;

      this.obs = this.dataSource.connect();
    });
  }

  public onSearchChange(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
