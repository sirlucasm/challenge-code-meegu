import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CreateUserDTO } from '../../models/user/dtos/user.dto';
import { UserService } from './user.service';
import { BadRequestException } from '@nestjs/common';
import { generate } from 'gerador-validador-cpf';

describe('UserService', () => {
  let userService: UserService;

  const random = Math.floor((Math.random() * 1000)+1);

  const data: CreateUserDTO = {
    document: "123.456.789-13",
    name: 'TestJest' + random,
    zipcode: "01001-000",
    acceptedTerms: true,
    birthdate: new Date("2044-08-31T14:00:00.408Z")
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [UserService, PrismaService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Create User', () => {
    it('should return the created user', async () => {
      // change these values to pass on endpoint validation
      const dataClone = {...data};
      dataClone.document = generate({ format: true });
      dataClone.birthdate = new Date("2001-08-31T14:00:00.408Z");

      const user = await userService.create(dataClone);
      expect(user).toHaveProperty('id');
    });

    it('should return "User already exists" ERROR', () => {
      expect(userService.create(data)).rejects.toThrowError('User already exists');
    });

    it('should return "User must be over 18 yo." ERROR', () => {
      data.document = generate({ format: true });
      expect(userService.create(data)).rejects.toThrowError('User must be over 18 yo.');
    });
  });

  describe('List User by ID', () => {
    it('should return selected User', async () => {
      const user = await userService.find('10');
      expect(user).toHaveProperty('id');
    });
  });

  describe('List All Users', () => {
    it('should return User array', async () => {
      expect(Array.isArray(await userService.index())).toBe(true);
    });
  });

  describe('Update User', () => {
    it('should return the updated User', async () => {
      const user = await userService.update('10', { name: 'UpdatedTestJest' });
      expect(user).toHaveProperty('name', 'UpdatedTestJest');
    });
  });
});
