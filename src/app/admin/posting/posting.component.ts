import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoicePayload } from 'src/app/_models/request-response.model';
import { PostingService } from 'src/app/_services/posting.service.';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss']
})
export class PostingComponent implements OnInit {

  public postings: InvoicePayload.Posting[];
  public typeColors = {
    [InvoicePayload.PostingType.balance]: 'badge-secondary',
    [InvoicePayload.PostingType.charges]: 'badge-info',
    [InvoicePayload.PostingType.income]: 'badge-success',
    [InvoicePayload.PostingType.service]: 'badge-warning',
  };

  private invoiceId: string;

  constructor(
    private postingService: PostingService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.invoiceId = params.get('invoiceId');
      this.getPostings();
    });
  }

  private getPostings() {
    this.postingService
      .list(this.invoiceId)
      .subscribe(
        (response) => {
          this.postings = response.result;
        },
        (error) => {
          // TODO:
        }
      );
  }
}
