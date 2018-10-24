import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailPayload } from 'src/app/_models/request-response.model';
import { AlertService } from 'src/app/_services/alert.service';
import { EmailService } from 'src/app/_services/email.service';

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.scss']
})
export class EmailDetailComponent implements OnInit {

  public email: EmailPayload.Email;

  private emailId: string;

  constructor(
    private alertService: AlertService,
    private emailService: EmailService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.emailId = params.get('emailId');
      this.getEmail();
    });
  }

  private getEmail() {
    this.emailService
      .get(this.emailId)
      .subscribe(
        (response) => {
          this.email = response.result;
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }

}
