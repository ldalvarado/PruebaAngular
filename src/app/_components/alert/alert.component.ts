import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
//import { Alert, AlertType } from '@app/_models';
import { AlertService } from '../../_services/alert.service';
import { Alert } from '../../_models/index';
import {Message,MessageService} from 'primeng/api';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;
  alerts: Message[] = [];
  alertSubscription?: Subscription;
  routeSubscription?: Subscription;

  constructor(private router: Router, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
          
          // clear alerts when an empty alert is received
          if (!alert.summary) {
              // filter out alerts without 'keepAfterRouteChange' flag
              this.alerts = this.alerts.filter(x => x.key);

              // remove 'keepAfterRouteChange' flag on the rest
              this.alerts.forEach(x => delete x.key);
              return;
          }
          
          // add alert to array
          this.alerts.push(alert);
          // auto close alert if required
          if (alert.closable) {
              setTimeout(() => this.removeAlert(alert), 3000);
          }
      });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    /*this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();*/
  }

  removeAlert(alert: Message) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
        // fade out alert
        alert.closable = true;

        // remove alert after faded out
        setTimeout(() => {
            this.alerts = this.alerts.filter(x => x !== alert);
        }, 250);
    } else {
        // remove alert
        this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

}
