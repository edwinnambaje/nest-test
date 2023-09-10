import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    public async createProduct(
        createProductDto: CreateProductDTO,
    ): Promise<Product> {
        const { name, description, price } = createProductDto;

        const product = new Product();
        product.name = name;
        product.description = description;
        product.price = price;

        await product.save();
        return product;
    }


    public async getProducts(): Promise<Product[]> {
        return await this.productRepository.find();
    }


    public async getProduct(productId: number): Promise<Product> {
        const foundProduct = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (!foundProduct) {
            throw new NotFoundException('Product not found');
        }
        return foundProduct;
    }


    public async editProduct(
        productId: number,
        createProductDto: CreateProductDTO,
    ): Promise<Product> {
        const editedProduct = await this.productRepository.findOne({
            where: { id: productId }
        });
        if (!editedProduct) {
            throw new NotFoundException('Product not found');
        }
        const { name, description, price } = createProductDto;

        editedProduct.name = name;
        editedProduct.description = description;
        editedProduct.price = price;
        await editedProduct.save();

        return editedProduct;
    }


    public async deleteProduct(productId: number): Promise<void> {
        await this.productRepository.delete(productId);
    }
}