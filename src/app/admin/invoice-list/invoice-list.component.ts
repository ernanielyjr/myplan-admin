import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Locale } from 'src/app/locale';
import { InvoicePayload, PagSeguro } from 'src/app/_models/request-response.model';
import { AlertService } from 'src/app/_services/alert.service';
import { CustomerService } from 'src/app/_services/customer.service';
import { InvoiceService } from 'src/app/_services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  public loading = false;
  public invoices: InvoicePayload.Invoice[];
  public monthNames = Locale.monthNames;
  public customerId: string;
  public statusList = PagSeguro.Transaction.statusText;

  private dateNow = new Date();

  constructor(
    private alertService: AlertService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get('customerId');
      this.getInvoices();
    });
  }

  public generateFirstInvoice() {
    this.loading = true;
    this.customerService
      .generateFirstInvoice(this.customerId)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response) => {
          this.getInvoices();
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }

  public resendEmail(invoice: InvoicePayload.Invoice) {
    if (!confirm('Deseja reenviar o email para esta fatura?')) {
      return;
    }

    this.loading = true;

    this.invoiceService
      .resendEmail(invoice._id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response) => {
          this.getInvoices();
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }

  public closeInvoice(invoice: InvoicePayload.Invoice) {
    if (!confirm('Deseja realmente fechar esta fatura?')) {
      return;
    }

    this.loading = true;

    this.invoiceService
      .closeInvoice(invoice._id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response) => {
          this.getInvoices();
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }

  public isOverdue(date: string) {
    return this.dateNow.toISOString().substr(0, 10) > date.substr(0, 10);
  }

  private getInvoices() {
    this.loading = true;

    let selectedService = this.invoiceService.list();
    if (this.customerId) {
      selectedService = this.invoiceService.listByCustomer(this.customerId);
    }

    selectedService
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response) => {
          this.invoices = response.result;
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }
}
