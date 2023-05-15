import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Product, ProductDocument } from '../schemas/product.schema';

describe('ProductService', () => {
  let productService: ProductService;
  let productModel: Model<ProductDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: 'ProductModel',
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productModel = module.get<Model<ProductDocument>>('ProductModel');
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const products = [{}, {}, {}] as Product[];
      jest.spyOn(productModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(products),
      } as any);
      const result = await productService.getAllProducts();
      expect(result).toEqual(products);
    });
  });
});
