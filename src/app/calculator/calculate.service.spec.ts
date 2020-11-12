import { CalculateService } from './calculate.service';
import { Operator } from './operator.enum';

describe('CalculateService', () => {
  let service: CalculateService;

  beforeEach(() => {
    service = new CalculateService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be emitting entered numbers', (done) => {
    testResult([1], done);
    service.press('1'); // Subject does not store the data so need to execute after test setup
  });

  it('should be able to enter multiple numbers', (done) => {
    service.press('1');
    service.press('2');
    testResult([123], done);
    service.press('3');
  });

  it('should be able to add 2 numbers', (done) => {
    service.press('1');
    service.press(Operator.PLUS);
    testResult([1, Operator.PLUS, 2], done);
    service.press('2');
  });

  it('should let the last operator prevail', (done) => {
    service.press('1');
    service.press(Operator.PLUS);
    testResult([1, Operator.MINUS], done);
    service.press(Operator.MINUS);
  });

  it('should not begin with an operator', (done) => {
    service.press(Operator.MINUS); // begin with operator
    service.press('1');
    testResult([1, Operator.PLUS], done);
    service.press(Operator.PLUS);
  });


  function testResult(expected: Array<number | Operator>, done: DoneFn): void {
    service.resultStream.subscribe((array) => {
      expect(array).toEqual(expected);
      done();
    }, (error) => {
      fail('observable errored out: ' + error);
    });
  }
});
