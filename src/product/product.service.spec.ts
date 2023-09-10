import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './product.entity';

describe('UsersService', () => {
  let service: ProductService;

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('create => Should create a new product and return its data', async () => {
  //   const createUserDto = {
  //     name: 'Chadwick',
  //     description: 'Boseman',
  //     price: '1200',
  //   } as CreateProductDTO;

  //   const product = {
  //     name: "Chadwick",
  //     description: "Boseman",
  //     price: "1200",
  //     id: 1
  //   } as Product;

  //   jest.spyOn(mockUserRepository, 'save').mockReturnValue(product);
  //   const result = await service.createProduct(createUserDto);
  //   expect(mockUserRepository.save).toBeCalled();
  //   expect(mockUserRepository.save).toBeCalledWith(CreateProductDTO);

  //   expect(result).toEqual(service);
  // });

  it('findAll => should return an array of user', async () => {
    const user = {
      name: "Chadwick",
      description: "Boseman",
      price: "1200",
      id: 1
    };
    const users = [user];
    jest.spyOn(mockUserRepository, 'find').mockReturnValue(users);
    const result = await service.getProducts();
    expect(result).toEqual(users);
    expect(mockUserRepository.find).toBeCalled();
  });
  it('findOne => should find a user by a given id and return its data', async () => {
    const id = 1;
    const user = {
      id: 1,
      name: "Chadwick",
      description: "Boseman",
      price: "1200",
    };
    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);
    const result = await service.getProduct(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toBeCalled();
    expect(mockUserRepository.findOne).toBeCalledWith({ where: { id } });
  });
  it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
    const id = 1;
    const user = {
      id: 1,
      name: "Chadwick",
      description: "Boseman",
      price: "1200",
    };

    jest.spyOn(mockUserRepository, 'delete').mockReturnValue(user);
    await service.deleteProduct(id);
    expect(mockUserRepository.delete).toBeCalled();
    expect(mockUserRepository.delete).toBeCalledWith(id);
  });
});