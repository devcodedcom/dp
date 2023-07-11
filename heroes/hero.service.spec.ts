import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingCtrl: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {provide: MessageService, use: mockMessageService}
      ]
    })

    httpTestingCtrl = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService);
  })

  // Example with second way of inject of service
  // describe('getHero', () => {
  //   it('should call get with the correct URL', inject([HeroService, HttpTestingController], (service: HeroService, controller: HttpTestingController) => {
  //
  //   }));
  // });

  describe('getHero', () => {
    it('should call get with the correct URL', () => {
      heroService.getHero(4).subscribe(hero => {
        expect(hero.id).toBe(4);
      });
      const req = httpTestingCtrl.expectOne('api/heroes/4');

      req.flush({id: 4, name: 'SuperDude', strength: 100});
      expect(req.request.method).toBe('GET');
      httpTestingCtrl.verify();

    });
  });

});
