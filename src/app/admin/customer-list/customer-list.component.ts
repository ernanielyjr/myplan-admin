import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CustomerPayload } from 'src/app/_models/request-response.model';
import { AlertService } from 'src/app/_services/alert.service';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public loading = false;
  public customers: CustomerPayload.Customer[];

  constructor(
    private alertService: AlertService,
    private customerService: CustomerService,
  ) { }

  public ngOnInit() {
    this.getCustomers();
  }

  private getCustomers() {
    this.loading = true;

    this.customerService
      .list()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response) => {
          this.customers = response.result;
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }
}
