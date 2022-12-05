import { User } from 'src/app/models/user';

describe('User', () => {
    it('should create an instance', () => {
         let user: User = {id: 1};
        expect(user).toBeTruthy();
      });
})