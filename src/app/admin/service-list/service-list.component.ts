import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  public services: ServicePayload.Service[];
  public monthNames = Locale.monthNames;

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
    let selectedService = this.serviceService.list();
    if (this.customerId) {
      selectedService = this.serviceService.listByCustomer(this.customerId);
    }

    selectedService
      .subscribe(
        (response) => {
          this.services = response.result;
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }
}
