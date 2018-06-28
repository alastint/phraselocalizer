import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  TestBed,
  ComponentFixture,
  getTestBed
} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IAuthData } from '../../shared/interfaces';

/**
 * Load the implementations that should be tested.
 */
import { AppState } from '../../app.service';
import { LoginComponent } from './login.component';

describe(`Login component`, () => {
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let injector: TestBed;
  let service: AppState;
  let httpMock: HttpTestingController;

  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [AppState]
    })

      /**
       * Compile template and css.
       */
      .compileComponents();
    injector = getTestBed();
    service = injector.get(AppState);
    httpMock = injector.get(HttpTestingController);
  }));

  /**
   * Synchronous beforeEach.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;

    /**
     * Trigger initial data binding.
     */
    fixture.detectChanges();
  });

  it('should have user object', () => {
    expect(typeof comp.user).toEqual('object');
  });

  it('should have authenticate function', () => {
    expect(typeof comp.authenticate).toEqual('function');
  });

  it('should have default data in localState', () => {
    expect(comp.localState).toEqual({ value: '' });
  });

  it('should have user object with email and password properties', () => {
    const testUser: IAuthData = { email: '', password: '' };
    expect(comp.user).toEqual(testUser);
  });

  it('should invoke authenticate function and clear user data', () => {
    const testUserEmpty: IAuthData = { email: '', password: '' };
    const testUserFulfilled: IAuthData = { email: 'user@dummy.com', password: '123qwe' };
    expect(comp.user).toEqual(testUserEmpty);
    comp.user = testUserFulfilled;
    comp.authenticate(testUserFulfilled);
    expect(comp.user).toEqual(testUserEmpty);
  });

  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });

});
