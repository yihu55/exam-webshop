import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { Role } from '../../auth/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ValidationPipe } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  describe('addProduct', () => {
    it('should add a product', async () => {
      const mockProduct = {
        title: 'Test Product',
        description: 'Test Product Description',
        price: 100,
        images: undefined,
        weight: 0,
        manufacturer: '',
        category: '',
      };
      const createProductDto: CreateProductDTO = {
        title: 'Test Product',
        description: 'Test Product Description',
        price: 100,
        images: undefined,
        weight: 0,
        manufacturer: '',
        category: '',
      };
      jest.spyOn(productService, 'addProduct').mockResolvedValue(mockProduct);

      const req: any = {
        user: {
          id: '1',
          role: Role.Admin,
        },
      };

      const result = await controller.addProduct(createProductDto, req);
      expect(result).toEqual(mockProduct);
    });
  });
});
