import { Injectable,Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Message,MessageService } from 'primeng/api';
import { Alert, AlertType } from '../_models/index';

@Inject({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<any>();
  private defaultId = 'default-alert';

  onAlert(id = this.defaultId): Observable<any> {
    return this.subject.asObservable().pipe(filter(x => x && x.key === id));
  }

  // convenience methods
  success(message: string, options?: any) {
    this.alert({ ...options,severity:'success', summary: message });
  }

  error(message: string, options?: any) {
    this.alert({ ...options,severity:'error', summary: message }); 
  }

  info(message: string, options?: any) {
    this.alert({ ...options,severity:'info', summary: message });
  }

  warn(message: string, options?: any) {
    this.alert({ ...options,severity:'warn', summary: message });
  }

  // main alert method    
  alert(alert: Message) {
    alert.key = alert.key || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(key = this.defaultId) {
    this.subject.next(null);
    console.log(this.subject)
  }
}
