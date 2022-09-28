import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService,AlertService } from '../../../_services/index';
import { MessageService} from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private messageService: MessageService) {
      this.form = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(6), Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
      this.loading = true;
      this.accountService.login(this.f['username'].value,this.f['password'].value)
          .pipe(first())
          .subscribe({
              next: () => {
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.messageService.add({severity:'success', summary:'Login exitoso', life:5000, detail:this.f['username'].value});
                this.router.navigateByUrl(returnUrl);
              },
              error: error => {
                this.messageService.add({severity:'error', summary:'Error de login', life:5000, detail:error});
                this.loading = false;
              }
          });
    }
}
