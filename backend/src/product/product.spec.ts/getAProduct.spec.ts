import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ProductService } from '../product.service';
import { Product, ProductDocument } from '../schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('ProductService', () => {
  let productService: ProductService;
  let productModel: Model<ProductDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockProduct),
            constructor: jest.fn().mockResolvedValue(mockProduct),
            create: jest.fn().mockResolvedValue(mockProduct),
            save: jest.fn().mockResolvedValue(mockProduct),
            find: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue([mockProduct]),
            findById: jest.fn().mockReturnThis(),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockProduct),
            findByIdAndRemove: jest.fn().mockResolvedValue(mockProduct),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productModel = module.get<Model<ProductDocument>>(getModelToken('Product'));
  });

  const mockProduct: Product = {
    title: 'Mock Product',
    description: 'This is a mock product',
    price: 9.99,
    category: 'mock-category',
    images: { alt: 'mock', src: { small: 'mock', large: 'mock2' } },
    manufacturer: 'cake',
    weight: 1.11,
  };

  describe('getProduct', () => {
    it('should return a product with the given ID', async () => {
      const productId = 'abc123';
      const findByIdSpy = jest
        .spyOn(productModel, 'findById')
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockProduct),
        } as any);

      const result = await productService.getProduct(productId);

      expect(findByIdSpy).toHaveBeenCalledWith(productId);
      expect(result).toEqual(mockProduct);
    });
  });
});
