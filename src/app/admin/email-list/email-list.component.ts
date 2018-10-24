import { Component, OnInit } from '@angular/core';
import { EmailPayload } from 'src/app/_models/request-response.model';
import { AlertService } from 'src/app/_services/alert.service';
import { EmailService } from 'src/app/_services/email.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {

  public emails: EmailPayload.Email[];

  constructor(
    private alertService: AlertService,
    private emailService: EmailService,
  ) { }

  public ngOnInit() {
    this.getEmails();
  }

  private getEmails() {
    this.emailService
      .list()
      .subscribe(
        (response) => {
          this.emails = response.result;
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }

}
