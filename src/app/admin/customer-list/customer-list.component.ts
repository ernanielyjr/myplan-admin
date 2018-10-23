import { Component, OnInit } from '@angular/core';
import { CustomerPayload } from 'src/app/_models/request-response.model';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public customers: CustomerPayload.Customer[];

  constructor(
    private customerService: CustomerService,
  ) { }

  public ngOnInit() {
    this.getCustomers();
  }

  private getCustomers() {
    this.customerService
      .list()
      .subscribe(
        (response) => {
          this.customers = response.result;
        },
        (error) => {
          // TODO:
        }
      );
  }
}
