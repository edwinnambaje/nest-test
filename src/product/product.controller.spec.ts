import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductController } from './product.controller';

describe('UsersController', () => {
    let controller: ProductController;

    const mockUsersService = {
        createProduct: jest.fn(),
        getProducts: jest.fn(),
        getProduct: jest.fn(),
        editProduct: jest.fn(),
        deleteProduct: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductService,
                    useValue: mockUsersService,
                },
            ],
        }).compile();

        controller = module.get<ProductController>(ProductController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('create => should create a new user by a given data', async () => {
        // arrange
        const createUserDto = {
            name: 'Chadwick',
            description: 'Boseman',
            price: '1200',
        } as CreateProductDTO;

        const user = {
            id: 1,
            name: 'Chadwick',
            description: 'Boseman',
            price: '1200',
        } as Product;

        jest.spyOn(mockUsersService, 'createProduct').mockReturnValue(user);

        // act
        const result = await controller.createProduct(createUserDto);

        // assert
        expect(mockUsersService.createProduct).toBeCalled();
        expect(mockUsersService.createProduct).toBeCalledWith(createUserDto);

        expect(result).toEqual(user);
    });

    it('findAll => should return an array of user', async () => {
        //arrange
        const user = {
            id: 1,
            name: 'Chadwick',
            description: 'Boseman',
            price: '1200',
        };
        const users = [user];
        jest.spyOn(mockUsersService, 'getProducts').mockReturnValue(users);

        //act
        const result = await controller.getProducts();

        // assert
        expect(result).toEqual(users);
        expect(mockUsersService.getProducts).toBeCalled();
    });

    it('findOne => should find a user by a given id and return its data', async () => {
        const user = {
            id: 1,
            name: 'Chadwick',
            description: 'Boseman',
            price: '1200',
        };

        jest.spyOn(mockUsersService, 'getProduct').mockReturnValue(user);

        //act
        const result = await controller.getProduct(user.id);

        expect(result).toEqual(user);
        expect(mockUsersService.getProduct).toBeCalled();
        expect(mockUsersService.getProduct).toBeCalledWith(user.id);
    });

    // it('update => should find a user by a given id and update its data', async () => {
    //     //arrange
    //     const updateUserDto = {
    //         name: 'Chadwick',
    //         description: 'Boseman',
    //         price: '1200',
    //     } as CreateProductDTO;
    //     const user = {
    //         id: 1,
    //         name: 'Chadwick',
    //         description: 'Boseman',
    //         price: '1200',
    //     } as Product;

    //     const { id } = user


    //     jest.spyOn(mockUsersService, 'editProduct').mockReturnValue(user);

    //     //act
    //     const result = await controller.editProduct(id, updateUserDto);

    //     expect(result).toEqual(user);
    //     expect(mockUsersService.editProduct).toBeCalled();
    //     expect(mockUsersService.editProduct).toBeCalledWith(+id, updateUserDto);
    // });
    it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
        const id = '1';
        const user = {
            id: 1,
            name: 'Chadwick',
            description: 'Boseman',
            price: '1200',
        };

        jest.spyOn(mockUsersService, 'deleteProduct').mockReturnValue(user);

        //act
        const result = await controller.deleteProduct(user.id);

        expect(result).toEqual(user);
        expect(mockUsersService.deleteProduct).toBeCalled();
        expect(mockUsersService.deleteProduct).toBeCalledWith(+id);
    });
});