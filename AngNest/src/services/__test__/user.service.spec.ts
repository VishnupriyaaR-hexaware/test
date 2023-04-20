import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from '../../entities/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
    let service: UserService;
    let model: Model<UserDocument>;

    const mockUser = {
        _id: '616abed5ea5b5e296ae5ec8d',
        UserId: 76,
        UserName: "rapidx",
        UserAge: 76,
        UserPresent: "rapidx",
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockUser),
                        constructor: jest.fn().mockResolvedValue(mockUser),
                        find: jest.fn(),
                        findById: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                        findByIdAndRemove: jest.fn(),
                        create: jest.fn()
                    },
                },
            ],
        }).compile();
        service = module.get<UserService>(UserService);
        model = module.get<Model<UserDocument>>(getModelToken(User.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const mockUsers = [mockUser];
            jest.spyOn(model, 'find').mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(mockUsers) } as any);
            expect(await service.findAll()).toBe(mockUsers);
        });
    });

    describe('findById', () => {
        it('should return a user', async () => {
            jest.spyOn(model, 'findById').mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(mockUser) } as any);
            expect(await service.findById('616abed5ea5b5e296ae5ec8d')).toBe(mockUser);
        });
    });

    describe('create', () => {
        it('should create a user', async () => {
            jest.spyOn(model, 'create').mockReturnValueOnce(mockUser as any);
            expect(await service.create(mockUser as User)).toBe(mockUser);
        });
    });

    describe('update', () => {
        it('should update a user', async () => {
            jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce(mockUser as any);
            expect(await service.update('616abed5ea5b5e296ae5ec8d', mockUser as User)).toBe(mockUser);
        });
    });

    describe('delete', () => {
        it('should delete a user', async () => {
            jest.spyOn(model, 'findByIdAndRemove').mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(mockUser) } as any);
            expect(await service.delete('616abed5ea5b5e296ae5ec8d')).toBe(mockUser);
        });
    });
});