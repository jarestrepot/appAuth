import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatus } from '@auth/interfaces';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Todo pasa por aca

  private authService = inject(AuthService);
  private router = inject(Router);

  public finishAuthCheck = computed<boolean>(() => {

    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  })

  public authStatusChangedEffect = effect(() => {

    switch ( this.authService.authStatus() ) {
      case AuthStatus.checking:
        break;
      case AuthStatus.authenticated:
        const path: string| null = localStorage.getItem('path');
        this.router.navigateByUrl(path ?? '/dashboard');
        break;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/login')
        break;
    }

  })



}
