import { Component, OnInit } from '@angular/core';
import { CustomerPayload } from 'src/app/_models/request-response.model';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
