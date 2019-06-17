import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { User } from './user.model';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();

  private user: User;

  constructor(private afAuth: AngularFireAuth, private afDB: AngularFirestore, private router: Router, private store: Store<AppState>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/user`)
          .valueChanges().subscribe((objUser: any) => {
            const newUser = new User(objUser);

            this.store.dispatch(new SetUserAction(newUser));
            this.user = newUser;

          });
      } else {
        this.user = null;
        this.userSubscription.unsubscribe();
      }
    });
  }

  createUser(email: string, password: string, name: string) {
    this.store.dispatch(new ActivateLoadingAction());

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {

        const user: User = {
          uid: resp.user.uid,
          name,
          email: resp.user.email
        };

        this.afDB.doc(`${user.uid}/user`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new DeactivateLoadingAction());
          });

      })
      .catch(err => {
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire({
          type: 'error',
          title: 'Register Error',
          text: err.message
        });
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivateLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.router.navigate(['/']);
        this.store.dispatch(new DeactivateLoadingAction());
      })
      .catch(err => {
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire({
          type: 'error',
          title: 'Login Error',
          text: err.message
        });
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();

    this.store.dispatch(new UnsetUserAction());
  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (fbUser == null) {
            this.router.navigate(['/login']);
          }

          return fbUser != null;
        })
      );
  }

  getUser() {
    return {
      ...this.user
    };
  }
}
