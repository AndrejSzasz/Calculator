import { CalculateService } from './calculate.service';

describe('CalculateService', () => {
  let service: CalculateService;

  beforeEach(() => {
    service = new CalculateService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be emitting entered numbers', (done) => {
    service.resultStream.subscribe((array) => {
      expect(array).toEqual([1]);
      done();
    }, (error) => {
      fail('observable errored out: ' + error);
    });
    service.press('1'); // Subject does not store the data so need to execute after test setup
  });

});
