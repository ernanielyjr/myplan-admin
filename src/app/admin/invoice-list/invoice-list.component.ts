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
  public filters = {
    status: 'closed',
    payment: 'unpaid',
    dueDate: 'overdue',
    month: '',
    year: '',
  };
  public monthValue = '';
  public yearValue = '';

  private fullInvoicesList: InvoicePayload.Invoice[];
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

  public setFilter(filterName: string, value: string) {
    let newValue = value;
    if (filterName === 'month' || filterName === 'year') {
      try {
        const valueInt = parseInt(value, 10);

        if (
          (filterName === 'month' && valueInt >= 1 && valueInt <= 12) ||
          (filterName === 'year' && valueInt >= 2018 && valueInt <= 2099)
        ) {
          newValue = valueInt.toString();
        } else {
          newValue = '';
        }
      } catch (_) {
        newValue = '';
      }

      this[`${filterName}Value`] = newValue;
    }

    this.filters[filterName] = newValue;
    this.filterResults();
  }

  private filterResults() {
    this.invoices = this.fullInvoicesList.filter((invoice) => {
      let includeThis = true;

      if (this.filters.status === 'closed' && !invoice.closed) {
        includeThis = false;
      } else if (this.filters.status === 'open' && invoice.closed) {
        includeThis = false;
      }

      if (this.filters.payment === 'paid' && !invoice.paid) {
        includeThis = false;
      } else if (this.filters.payment === 'unpaid' && invoice.paid) {
        includeThis = false;
      }

      if (this.filters.dueDate === 'overdue' && invoice.dueDate && !this.isOverdue(invoice.dueDate)) {
        includeThis = false;
      } else if (this.filters.dueDate === 'ok' && invoice.dueDate && this.isOverdue(invoice.dueDate)) {
        includeThis = false;
      }

      if (this.filters.month && this.filters.month !== invoice.month.toString()) {
        includeThis = false;
      }

      if (this.filters.year && this.filters.year !== invoice.year.toString()) {
        includeThis = false;
      }

      return includeThis;
    });
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
          this.fullInvoicesList = response.result;
          this.invoices = response.result;
          this.filterResults();
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }
}
