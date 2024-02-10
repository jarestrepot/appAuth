import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginUserResponse, User } from '@auth/interfaces';
import { BodyRegister } from '@auth/interfaces/body-register';
import { RegisterResponse } from '@auth/interfaces/resgiter-response.interface';
import { ValidationErrors } from '@angular/forms';



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
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }

  constructor() {
    this.verifyTokenUser().subscribe();
  }


  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginUserResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(({ error }) => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return throwError(() => error.message);
        })
      );

  }


  register({ email, name , password }: BodyRegister): Observable<boolean>{

    const url = `${this.baseUrl}/auth/register`;
    const body = { email, name, password }
    return this.http.post<RegisterResponse>( url, body )
    .pipe(
      tap( (response) => console.log( response )),
      map( ({ user, token }) => this.setAuthentication(user, token)),
      catchError(( { error } ) => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return throwError(() => error );
      })
    )

  }

  verifyTokenUser(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of( false );
    };

    // Headers
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);


    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ token, user }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );

  }

  logout():void {
    localStorage.removeItem('token');
    this._authStatus.set(AuthStatus.notAuthenticated);
    this._currentUser.set( null );
  }

  checkEmail(email: string): Observable<boolean>{
    const url = `${this.baseUrl}/auth/check-email`;
    const body = { email };
    return this.http.post<boolean>(url, body);
  }


}
