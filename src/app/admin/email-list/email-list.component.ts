import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { EmailPayload } from 'src/app/_models/request-response.model';
import { AlertService } from 'src/app/_services/alert.service';
import { EmailService } from 'src/app/_services/email.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {

  public loading = false;
  public emails: EmailPayload.Email[];

  constructor(
    private alertService: AlertService,
    private emailService: EmailService,
  ) { }

  public ngOnInit() {
    this.getEmails();
  }

  private getEmails() {
    this.loading = true;

    this.emailService
      .list()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response) => {
          this.emails = response.result;
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }

  public deleteEmail(email: EmailPayload.Email) {
    if (!confirm('Deseja realmente excluir este e-mail?')) {
      return;
    }

    this.loading = true;

    this.emailService
      .delete(email._id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response) => {
          this.getEmails();
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
        }
      );
  }
}
