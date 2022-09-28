import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AccountService } from '../../../_services/index';
import { User } from '../../../_models/index';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: any[] = [];
  loading: boolean = false;
  constructor(private accountService: AccountService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService) { }
  ngOnInit() {
    this.loading = true;
    this.accountService.getAll().pipe(first()).subscribe((users?: any) => {
      this.users = users;
      this.loading = false;
    })
  }
  filtrar(event: any,dt: any){
    dt.filterGlobal(event.target.value, 'contains')
  }
  deleteUser(id: any) {
    console.log(this.confirmationService);
    this.confirmationService.confirm({
      message: '¿Esta seguro de que desea eliminar este registro?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.accountService.delete(id)
        .pipe(first())
        .subscribe(() => {
          let newArray = this.users.filter((x?: any) => x.id !== id);
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
          this.users = newArray;
        });
      },
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity:'error', summary:'Rechazada', detail:'Operacion rechazada'});
          break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity:'warn', summary:'Cancelada', detail:'Operacion cancelada'});
          break;
        }
      }
    });
  }
}
