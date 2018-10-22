import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private returnUrl: string;

  public loading = false;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  public ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  public get form() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      // TODO: Emit alert service
      return;
    }

    this.loading = true;
    this.authService.login(this.form.username.value, this.form.password.value)
      .subscribe(
        (response) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          // TODO: this.alertService.error(error);
          this.loading = false;
        });
  }

}
