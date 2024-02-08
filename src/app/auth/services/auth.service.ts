import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { AuthStatus, LoginUserResponse, User } from '@auth/interfaces';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  // Signals
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // Señal de solo lectura.
  public currentUser = computed(() => this._currentUser);
  public authStatus = computed(() => this._authStatus);


  login(email: string, password: string): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/login`;
    const body = { email, password };

    return this.http.post<LoginUserResponse>(url, body)
      .pipe(
        tap(({ user, token }) => {

          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);

        }),
        map( () => true ),
        // catchError( () => this._authStatus.set( AuthStatus.notAuthenticated ))
      );

  }
}
