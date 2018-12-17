import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CustomerPayload } from 'src/app/_models/request-response.model';
import { AlertService } from 'src/app/_services/alert.service';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  public loading = false;
  public customer: CustomerPayload.Customer;

  private customerId: string;

  constructor(
    private alertService: AlertService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get('customerId');
      this.getCustomer();
    });
  }

  private getCustomer() {
    this.loading = true;

    this.customerService
      .get(this.customerId)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response) => {
          this.customer = response.result;
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }

}
