import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Locale } from 'src/app/locale';
import { ServicePayload } from 'src/app/_models/request-response.model';
import { AlertService } from 'src/app/_services/alert.service';
import { ServiceService } from 'src/app/_services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

  public loading = false;
  public services: ServicePayload.Service[];
  public monthNames = Locale.monthNames;
  public amountActiveSum = 0;
  public amountInactiveSum = 0;

  private customerId: string;

  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
  ) { }

  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get('customerId');
      this.getServices();
    });
  }

  private getServices() {
    this.loading = true;

    let selectedService = this.serviceService.list();
    if (this.customerId) {
      selectedService = this.serviceService.listByCustomer(this.customerId);
    }

    selectedService
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response) => {
          this.services = response.result;
          this.amountActiveSum = this.services.filter(service => !service.inactive).reduce((sum, service) => sum + service.amount, 0);
          this.amountInactiveSum = this.services.filter(service => service.inactive).reduce((sum, service) => sum + service.amount, 0);
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }
}
