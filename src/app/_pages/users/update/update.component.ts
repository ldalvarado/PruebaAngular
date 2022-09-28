import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService, ValidationService } from '../../../_services/index';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  id: string;
  isAddMode: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(6), Validators.email]],
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', passwordValidators]
    });

    if (!this.isAddMode) {
      this.accountService.getById(this.id)
      .pipe(first())
      .subscribe(x => this.form.patchValue(x));
    }
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
    this.registerOrupdate();
}

  private registerOrupdate() {
    this.accountService.registerOrupdate(this.id, this.form.value)
    .pipe(first())
    .subscribe({
      next: () => {
        this.alertService.success('Operación realizada con exito', { keepAfterRouteChange: true });
        this.router.navigate(['/users'], { relativeTo: this.route });
      },
      error: error => {
        this.alertService.error(error);
        this.loading = false;
      }
    });
  }

}
