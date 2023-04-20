import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../entities/user.entity';
import { UserService } from '../../services/user.service';
import { UserController } from '../user.controller';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const singleUser = {
    UserId: 41,
    UserName: "rapidx",
    UserAge: 41,
    UserPresent: "rapidx",
  } as User;

  const multipleUsers = [
    {
      UserId: 41,
      UserName: "rapidx",
      UserAge: 41,
      UserPresent: "rapidx",
    },
  ] as User[];

  const createdUser = {
    _id: '1',
    UserId: 41,
    UserName: "rapidx",
    UserAge: 41,
    UserPresent: "rapidx",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(multipleUsers);
      expect(await controller.findAll()).toEqual(multipleUsers);
    });
  });

  describe('findById', () => {
    it('should return a user with the given id', async () => {
      jest.spyOn(service, 'findById').mockResolvedValueOnce(createdUser);
      expect(await controller.findById(createdUser._id)).toEqual(createdUser);
    });
    it('should throw a NotFoundException when user is not found', async () => {
      jest.spyOn(service, 'findById').mockResolvedValueOnce(null);
      await expect(controller.findById(createdUser._id)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should return the newly created user', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(createdUser);
      expect(await controller.create(singleUser)).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should return the updated user', async () => {
      jest.spyOn(service, 'update').mockResolvedValueOnce(createdUser);
      expect(await controller.update(createdUser._id, singleUser)).toEqual(createdUser);
    });
    it('should throw a NotFoundException when user is not found', async () => {
      jest.spyOn(service, 'update').mockResolvedValueOnce(null);
      await expect(controller.update(createdUser._id, singleUser)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should delete user successfully', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(createdUser);
      const response = await controller.delete(createdUser._id);
      expect(response).toEqual(createdUser);
      expect(service.delete).toHaveBeenCalledWith(createdUser._id);
    });
    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(null);
      await expect(controller.delete(createdUser._id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(service.delete).toHaveBeenCalledWith(createdUser._id);
    });
  });
});