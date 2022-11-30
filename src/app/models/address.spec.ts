import { Address } from './address';

describe('Address', () => {
  it('should create an instance', () => {
    expect(new Address('Matt','Hanson','123 Fake St','','Waldorf', 'MD','20601','USA')).toBeTruthy();
  });
});
