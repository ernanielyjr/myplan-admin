import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Locale } from 'src/app/locale';
import { InvoicePayload } from 'src/app/_models/request-response.model';
import { InvoiceService } from 'src/app/_services/invoice.service';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  public invoices: InvoicePayload.Invoice[];
  public monthNames = Locale.monthNames;

  private customerId: string;

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
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
        // TODO:
      }
    );
  }

  public closeInvoice(invoice: InvoicePayload.Invoice) {
    this.invoiceService
    .closeInvoice(invoice._id)
    .subscribe(
      (response) => {
        this.getInvoices();
      },
      (error) => {
        // TODO:
      }
    );
  }

  private getInvoices() {
    this.invoiceService
      .listByCustomer(this.customerId)
      .subscribe(
        (response) => {
          this.invoices = response.result;
        },
        (error) => {
          // TODO:
        }
      );
  }
}
