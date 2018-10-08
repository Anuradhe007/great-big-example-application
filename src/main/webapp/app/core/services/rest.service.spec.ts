import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';

// I don't know about this one
import { ɵangular_packages_common_http_testing_testing_a as HttpClientTestingBackend } from '@angular/common/http/testing';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Hero } from '../store/hero/hero.model';
import { RESTService } from './rest.service';
import { AppConfig } from '../../app.config';
import { GreatBigExampleApplicationTestModule } from '../../../mocks/test.module';

const makeHeroData = () =>
    [{ id: '1', name: 'Windstorm' }, { id: '2', name: 'Bombasto' }, { id: '3', name: 'Magneta' }, { id: '4', name: 'Tornado' }] as Hero[];

////////  Tests  /////////////
describe('HttpClient-RESTService (mockBackend)', () => {
    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [GreatBigExampleApplicationTestModule, HttpClientModule],
                providers: [RESTService]
            }).compileComponents();
        })
    );

    it(
        'can instantiate service when inject service',
        inject([RESTService], (service: RESTService) => {
            expect(service instanceof RESTService).toBe(true);
        })
    );

    it(
        'can instantiate service with "new"',
        inject([HttpClient, AppConfig], (http: HttpClient, config: AppConfig) => {
            expect(http).not.toBeNull('http should be provided');
            const service = new RESTService(http, config);
            expect(service instanceof RESTService).toBe(true, 'new service should be ok');
        })
    );

    describe('when getHeroes', () => {
        let backend: HttpClientTestingBackend;
        let service: RESTService;
        let fakeHeroes: Hero[];
        let response: Response;

        beforeEach(
            inject([HttpClient, AppConfig], (http: HttpClient, config: AppConfig, be: HttpClientTestingBackend) => {
                backend = be;
                service = new RESTService(http, config);
                fakeHeroes = makeHeroData();
                const options = { status: 200, body: { data: fakeHeroes }, locked: false, cancel: false };
                // response = new Response(options);
            })
        );

        // it('should have expected fake heroes (then)', async(inject([], () => {
        //   backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        //   service.getEntities('heroes').toPromise()
        //     // .then(() => Promise.reject('deliberate'))
        //     .then(heroes => {
        //       expect(heroes.length).toBe(fakeHeroes.length,
        //         'should have expected no. of heroes');
        //     });
        // })));

        // it('should have expected fake heroes (Observable.do)', async(inject([], () => {
        //   backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        //   service.getEntities('heroes')
        //     .do(heroes => {
        //       expect(heroes.length).toBe(fakeHeroes.length,
        //         'should have expected no. of heroes');
        //     })
        //     .toPromise();
        // })));

        // it('should be OK returning no heroes', async(inject([], () => {
        //   let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        //   backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        //   service.getEntities('heroes')
        //     .do(heroes => {
        //       expect(heroes.length).toBe(0, 'should have no heroes');
        //     })
        //     .toPromise();
        // })));

        // it('should treat 404 as an Observable error', async(inject([], () => {
        //   let resp = new Response(new ResponseOptions({ status: 404 }));
        //   backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        //   service.getEntities('heroes')
        //     .do(heroes => {
        //       fail('should not respond with heroes');
        //     })
        //     .catch(err => {
        //       expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
        //       return Observable.of(null); // failure is the expected test result
        //     })
        //     .toPromise();
        // })));
    });
});

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
