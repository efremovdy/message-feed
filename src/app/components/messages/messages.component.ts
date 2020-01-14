import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { ApiService } from '../../api.service';
import { MessageModel } from '../../models/message-interface';
import { AddModalComponent } from './modal/add-modal.component';
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
  private authors: any = [];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.apiService.getMessages().subscribe((messages: MessageModel[]) => {
      this.messages = messages.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
      this.generateAuthors();

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

  public openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    dialogConfig.data = {
      authors: this.authors
    };

    const dialogRef = this.dialog.open(AddModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => this.addMessage(data));
  }

  private addMessage(data: any) {
    const newMessage: MessageModel = {
      id: null,
      createdDate: new Date(),
      text: data.text,
      authorId: data.authorId,
      authorName: this.authors.filter(a => a.authorId === data.authorId)[0].authorName
    };

    this.apiService.addNewMessage(newMessage).subscribe(() => {
      this.ngOnInit();
    });
  }

  private generateAuthors() {
    this.authors = this.messages.map(m => {
      return {
        authorId: m.authorId,
        authorName: m.authorName
      };
    });

    const uniqueAddresses = Array.from(new Set(this.authors.map(a => a.authorId))) // unique authors array
      .map(authorId => {
        return this.authors.find(a => a.authorId === authorId);
      });

    this.authors = uniqueAddresses;
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
