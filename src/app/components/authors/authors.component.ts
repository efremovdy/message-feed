import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { AuthorModel } from '../../models/author-interface';
import { MessageModel } from '../../models/message-interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.less']
})
export class AuthorsComponent implements OnInit {
  public authors: AuthorModel[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAuthors().subscribe((authors: AuthorModel[]) => {
      this.authors = authors;
    });
  }

  public getAuthorMessages(authorId: number) {
    if (this.authors.filter(a => a.id === authorId)[0].messages) {
      return;
    }
    this.apiService.getAuthorMessages(authorId).subscribe((messages: MessageModel[]) => {
      this.authors.forEach(a => {
        if (a.id === authorId) {
          a.messages = messages;
        }
      });
    });
  }
}
