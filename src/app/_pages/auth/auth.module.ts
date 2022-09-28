import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CheckboxModule} from 'primeng/checkbox';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      AuthRoutingModule,
      ToastModule,
      PanelModule,
      DropdownModule,
      InputTextModule,
      InputTextareaModule,
      AutoCompleteModule,
      ButtonModule,
      CheckboxModule,
    ],
    declarations: [
      LayoutComponent,
      LoginComponent,
      RegisterComponent
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule { }
