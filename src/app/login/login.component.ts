import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private returnUrl: string;

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  public onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.alertService.error('Preencha corretamente!');
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .subscribe(
        (response) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.alertService.error('Algo deu errado!');
          this.loading = false;
        });
  }

}
