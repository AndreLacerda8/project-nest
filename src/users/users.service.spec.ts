import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bet } from '../bets/entities/bet.entity';
import { UsersPermission } from '../users-permissions/entities/userspermission.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

import TestUtil from '../common/test/TestUtil'
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockRepository,
      }, 
      {
        provide: getRepositoryToken(Bet),
        useValue: mockRepository,
      },
      {
        provide: getRepositoryToken(UsersPermission),
        useValue: mockRepository,
      }
    ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserById', () => {
    it('should return a exception when user not found', async () => {
      mockRepository.findOne.mockReturnValue(null)
      expect(service.getUserById('3')).rejects.toBeInstanceOf(NotFoundException)
    })
    it('should find a existing user', async () => {
      const user = TestUtil.validUser()
      mockRepository.findOne.mockReturnValue(user)
      const userFound = await service.getUserById('1')
      expect(userFound).toMatchObject({
        name: user.name,
        email: user.email
      })
    })
  })

  describe('findUserByEmail', () => {
    it('should return a exception when user not found', async () => {
      mockRepository.findOne.mockReturnValue(null)
      expect(service.findByEmail('email@mail.com')).rejects.toBeInstanceOf(NotFoundException)
    })
    it('should find a existing user', async () => {
      const user = TestUtil.validUser()
      mockRepository.findOne.mockReturnValue(user)
      const userFound = await service.findByEmail('andre@mail.com')
      expect(userFound).toMatchObject({
        name: user.name,
        email: user.email
      })
    })
  })

  describe('create', () => {
    it('should return a exception when email alreadyExists', async () => {
      const user = TestUtil.validUser()
      mockRepository.findOne.mockReturnValue(user)
      expect(service.create(user)).rejects.toBeInstanceOf(BadRequestException)
    })
    it('should return the new user', async () => {
      const user = TestUtil.validUser()
      mockRepository.findOne.mockReturnValue(null)
      mockRepository.create.mockReturnValue(user)
      const newUser = await service.create(user)
      expect(newUser).toMatchObject({
        name: user.name,
        email: user.email
      })
    })
  })

  describe('update', () => {
    it('should return a exception when user not found', async () => {
      const user = TestUtil.validUser()
      mockRepository.findOne.mockReturnValue(null)
      expect(service.update('1',user)).rejects.toBeInstanceOf(NotFoundException)
    })
    it('should return the updated user', async () => {
      const user = TestUtil.validUser()
      mockRepository.findOne.mockReturnValue(user)
      mockRepository.update.mockReturnValue(user)
      const newUser = await service.update('1',user)
      expect(newUser).toMatchObject({
        name: user.name,
        email: user.email
      })
    })
  })

  describe('remove', () => {
    it('should return a exception when user not found', async () => {
      mockRepository.findOne.mockReturnValue(null)
      expect(service.remove('1')).rejects.toBeInstanceOf(NotFoundException)
    })
    it('should return true', async () => {
      const user = TestUtil.validUser()
      mockRepository.findOne.mockReturnValue(user)
      mockRepository.delete.mockReturnValue({ affected: 1 })
      const newUser = await service.remove('1')
      expect(newUser.toString()).toMatch('true')
    })
  })
});
