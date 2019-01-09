import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Locale } from 'src/app/locale';
import { InvoicePayload, PagSeguro } from 'src/app/_models/request-response.model';
import { AlertService } from 'src/app/_services/alert.service';
import { InvoiceService } from 'src/app/_services/invoice.service';

@Component({
  selector: 'app-posting-list',
  templateUrl: './posting-list.component.html',
  styleUrls: ['./posting-list.component.scss']
})
export class PostingListComponent implements OnInit {

  public loading = false;
  public invoice: InvoicePayload.Invoice;
  public monthNames = Locale.monthNames;
  public statusList = PagSeguro.Transaction.statusText;

  private dateNow = new Date();
  private invoiceId: string;

  constructor(
    private alertService: AlertService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.invoiceId = params.get('invoiceId');
      this.getPostings();
    });
  }

  public isOverdue(date: string) {
    return this.dateNow.toISOString().substr(0, 10) > date.substr(0, 10);
  }

  private getPostings() {
    this.loading = true;

    this.invoiceService
      .get(this.invoiceId)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response) => {
          this.invoice = response.result;
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }

  public deletePosting(invoiceId: string, posting: InvoicePayload.Posting) {
    if (!confirm('Deseja realmente excluir este lançamento?')) {
      return;
    }

    this.loading = true;

    this.invoiceService
      .deletePosting(invoiceId, posting._id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response) => {
          this.getPostings();
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }
}
