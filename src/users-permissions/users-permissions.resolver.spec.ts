import { Test, TestingModule } from '@nestjs/testing';
import { UsersPermissionsResolver } from './users-permissions.resolver';

describe('UsersPermissionsResolver', () => {
  let resolver: UsersPermissionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersPermissionsResolver],
    }).compile();

    resolver = module.get<UsersPermissionsResolver>(UsersPermissionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
