import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product(0, 'product name', 0, 'product descrition', 3.50, 'product URL', true)).toBeTruthy();
  });
});
