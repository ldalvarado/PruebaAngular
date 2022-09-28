import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { UsersRoutingModule } from './dashboard-routing.module';
import { TableModule } from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    LayoutComponent,
    UpdateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ConfirmPopupModule,
    ConfirmDialogModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }
