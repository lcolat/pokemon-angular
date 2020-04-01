import { CustomDatePipePipe } from './custom-date-pipe.pipe';

describe('CustomDatePipePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDatePipePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms correctly a date', () => {
    const pipe = new CustomDatePipePipe();
    const date = new Date(2000, 5, 10, 11, 59, 59);
    expect(pipe.transform(date)).toEqual('10/6/2000 at 11:59:59');
  });
});
