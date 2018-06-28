import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../../app.service';

interface IAuthData {
  email: string;
  password: string;
}

@Component({
  selector: 'login',
  providers: [],
  styleUrls: [ './login.component.css' ],
  templateUrl: './login.component.html'
})


export class LoginComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  /**
   * TypeScript public modifiers
   */
  public user: IAuthData = {
    email: '',
    password: ''
  };

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('`Login` component');
  }

  public authenticate(data: IAuthData) {
    console.log('authenticate data: ', data);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
