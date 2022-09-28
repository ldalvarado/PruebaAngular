import { Component } from '@angular/core';
import { AccountService } from './_services';
import { User } from './_models';
import {MenuItem} from 'primeng/api';
import { AlertComponent } from './_components/alert/alert.component';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyecto';
  user: any;
  items: MenuItem[];

  constructor(private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,) {
    this.accountService.user.subscribe(x => {
      this.user = x;
    });

    this.items = [
      {
        label:'Users',
        icon:'pi pi-fw pi-user',
        items:[
          {
            label:'Nuevo',
            icon:'pi pi-fw pi-user-plus',
            routerLink: ['users/add']
          },
          {
            label:'Acciones',
            icon:'pi pi-fw pi-users',
            items:[
                {
                label:'Filtrar',
                icon:'pi pi-fw pi-filter',
                items:[
                  {
                    label:'Imprimir',
                    icon:'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon:'pi pi-fw pi-bars',
                label:'Listar',
                routerLink: ['users']
              }
            ]
          }
        ]
      },
      {
        label:'Quit',
        icon:'pi pi-fw pi-power-off',
        command: (event) => {
          if(event.originalEvent.type === 'click'){
            this.logout();
          }
        }
      }
    ];
  }

  async logout() {
    await this.accountService.logout();
  }
}
