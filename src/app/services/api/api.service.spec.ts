import { async, inject, getTestBed, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  ResponseOptions,
  Response,
  XHRBackend,
  HttpModule,
  Headers,
  Http
} from '@angular/http';

/**
 * Load dependencies
 */

/**
 * Load the implementations that should be tested.
 */
import { ApiService } from './api.service';

describe(`Service: ApiService `, () => {
  let service: ApiService;
  let backend: MockBackend;
  const mockRespData: any = { data: { id: 1 } };

  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        imports: [
          HttpModule,
          RouterTestingModule.withRoutes([])
        ],
        providers: [
          BaseRequestOptions,
          MockBackend,
          ApiService,
          {
            provide: Http,
            useFactory: (back: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(back, defaultOptions);
            },
            deps: [ MockBackend, BaseRequestOptions ]
          },
          { provide: XHRBackend, useClass: MockBackend }
        ]
      });

    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(ApiService);

    function setupConnections(be: MockBackend, options: any) {
      be.connections.subscribe((connection: MockConnection) => {
        if (connection.request.url === 'api/forms') {
          const responseOptions = new ResponseOptions(options);
          const response = new Response(responseOptions);

          connection.mockRespond(response);
        }
      });
    }

    setupConnections(backend, mockRespData);
  }));

  describe(`Checking statements: `, () => {
    /**
     * Check variables
     */
    it('should have defined headers', () => {
      const mockHeaders: Headers = new Headers({
        'Accept': 'application/json',
        'Content-type': 'application/json'
      });
      service.ngOnInit();
      expect(service.headers).toEqual(mockHeaders);
    });

    it('should have defined http', () => {
      expect(service.http).toBeDefined();
    });
  });

  describe(`Checking functions: `, () => {
    /**
     * Check functions
     */
    it('should have ngOnInit function', () => {
      expect(typeof service.ngOnInit).toEqual('function');
    });

    it('should have get function', () => {
      expect(typeof service.get).toEqual('function');
    });

    it('should have post function', () => {
      expect(typeof service.post).toEqual('function');
    });

    it('should have put function', () => {
      expect(typeof service.put).toEqual('function');
    });

    it('should have delete function', () => {
      expect(typeof service.delete).toEqual('function');
    });

    it('should have setHeaders function', () => {
      expect(typeof service.setHeaders).toEqual('function');
    });

    it('should have getJson function', () => {
      expect(typeof service.getJson).toEqual('function');
    });

    it('should have checkForError function', () => {
      expect(typeof service.checkForError).toEqual('function');
    });
  });

  describe(`testing function invoke: `, () => {
    /**
     * Test functions
     */
    it('should return mockRespData value on getJson',
      inject([ApiService, XHRBackend], (apiService, mockBackend) => {
        let mockResp: any = new ResponseOptions({
          status: 200,
          statusText: 'Ok',
          body: JSON.stringify(mockRespData)
        });
        const baseResponse: any = new Response(mockResp);
        const respJson: any = service.getJson(baseResponse);
        expect(respJson).toEqual(mockRespData);
      }));

    it('should return response on checkForError with status 200', () => {
      const respSuccess: any = new ResponseOptions({
        status: 200,
        statusText: 'Ok',
        body: JSON.stringify(mockRespData)
      });
      const baseResponse: any = new Response(respSuccess);
      const respResult: any = service.checkForError(baseResponse);
      expect(respResult).toEqual(baseResponse);
    });

    it('should invoke get request and return mockRespData value',
      inject([MockBackend], async (be: MockBackend) => {
        const resp: any = new ResponseOptions({
          status: 200,
          statusText: 'Ok',
          body: JSON.stringify(mockRespData)
        });
        const baseResponse: any = new Response(resp);
        be.connections.subscribe(
          (c: MockConnection) => c.mockRespond(baseResponse)
        );
        await service.get('user').subscribe(
          (result: any) => {
            expect(result).not.toEqual({});
            expect(result).toEqual(mockRespData);
          },
          (err: any) => err
        );
      }));

    it('should invoke post request and return mockRespData value',
      inject([MockBackend], async (be: MockBackend) => {
        const resp: any = new ResponseOptions({
          status: 200,
          statusText: 'Ok',
          body: JSON.stringify(mockRespData)
        });
        const baseResponse: any = new Response(resp);
        be.connections.subscribe(
          (c: MockConnection) => c.mockRespond(baseResponse)
        );
        await service.post('user/1', mockRespData.data).subscribe(
          (result: any) => {
            expect(result).not.toEqual({});
            expect(result).toEqual(mockRespData);
          },
          (err: any) => err
        );
      }));

    it('should invoke put request and return mockRespData value',
      inject([MockBackend], async (be: MockBackend) => {
        const resp: any = new ResponseOptions({
          status: 200,
          statusText: 'Ok',
          body: JSON.stringify(mockRespData)
        });
        const baseResponse: any = new Response(resp);
        be.connections.subscribe(
          (c: MockConnection) => c.mockRespond(baseResponse)
        );
        await service.put('user/1', mockRespData.data).subscribe(
          (result: any) => {
            expect(result).not.toEqual({});
            expect(result).toEqual(mockRespData);
          },
          (err: any) => err
        );
      }));

    it('should invoke delete request and return mockRespData value',
      inject([MockBackend], async (be: MockBackend) => {
        const resp: any = new ResponseOptions({
          status: 200,
          statusText: 'Ok',
          body: JSON.stringify(mockRespData)
        });
        const baseResponse: any = new Response(resp);
        be.connections.subscribe(
          (c: MockConnection) => c.mockRespond(baseResponse)
        );
        await service.delete('user/1').subscribe(
          (result: any) => {
            expect(result).not.toEqual({});
            expect(result).toEqual(mockRespData);
          },
          (err: any) => err
        );
      }));
  });
});
