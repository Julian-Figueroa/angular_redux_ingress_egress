import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService, public store: Store<AppState>) { }
  loading: boolean;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.store.select('ui')
      .subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(data: any) {
    this.authService.login(data.email, data.password);
  }

}
