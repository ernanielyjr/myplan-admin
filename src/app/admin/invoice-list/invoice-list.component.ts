import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Locale } from 'src/app/locale';
import { InvoicePayload } from 'src/app/_models/request-response.model';
import { AlertService } from 'src/app/_services/alert.service';
import { CustomerService } from 'src/app/_services/customer.service';
import { InvoiceService } from 'src/app/_services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  public invoices: InvoicePayload.Invoice[];
  public monthNames = Locale.monthNames;
  public customerId: string;

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
    this.customerService
      .generateFirstInvoice(this.customerId)
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

    this.invoiceService
      .closeInvoice(invoice._id)
      .subscribe(
        (response) => {
          this.getInvoices();
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }

  private getInvoices() {
    let selectedService = this.invoiceService.list();
    if (this.customerId) {
      selectedService = this.invoiceService.listByCustomer(this.customerId);
    }

    selectedService
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
