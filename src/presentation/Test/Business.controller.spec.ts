import { Test, TestingModule } from '@nestjs/testing';
import { BusinessModule } from 'src/infrastructure/ioc/business.module';
import { BusinessController } from '../controllers/business.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setEnvironment } from 'src/infrastructure/environments';
import { TypeOrmConfigService } from 'ormconfig';
import { BusinessModel } from 'src/domain/models/Business';
import { BusinessUseCases } from 'src/application/use-cases/BusinessUseCase';
import { BusinessVM } from '../view-models/Business/BusinessVM';
import { CreateBusinessVM, UpdateBusinessVM } from '../view-models/Business';
import { BadRequestError } from '../errors/BadRequestError';
import { NotFoundError } from '../errors/NotFoundError';

describe('BusinessController', () => {
  let businessController: BusinessController;
  let businessUseCases: BusinessUseCases;

  const BUSINESS = new BusinessModel('COMERCIO1', 20);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        BusinessModule,
        ConfigModule.forRoot({ envFilePath: setEnvironment(), isGlobal: true }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
      ],
    }).compile();

    businessController = module.get<BusinessController>(BusinessController);
    businessUseCases = module.get<BusinessUseCases>(BusinessUseCases);
  });

  it('should be defined', () => {
    expect(businessController).toBeDefined();
  });
  it('allBusiness', async () => {
    const mockQuery = {
      take: 10,
      page: 1,
      keyword: '',
    };
    const mockPaginationResponse = {
      statusCode: 'success',
      data: [BUSINESS],
      count: 1,
      currentPage: 1,
      nextPage: null,
      prevPage: null,
      lastPage: 1,
    };
    jest
      .spyOn(businessUseCases, 'allBusiness')
      .mockImplementation(async () => mockPaginationResponse);
    const result = await businessController.allBusiness(mockQuery);
    expect(result).toEqual(mockPaginationResponse);
  });

  it('businessById', async () => {
    jest
      .spyOn(businessUseCases, 'getOneBusinessByField')
      .mockImplementation(async () => BUSINESS);
    const mockBusinessVM = BusinessVM.toViewModel(BUSINESS);
    const result = await businessController.businessById('1');
    expect(result).toEqual(mockBusinessVM);
  });

  it('createBusiness_error', async () => {
    const mockCreateBusinessVM = new CreateBusinessVM();
    const mockBadRequestError = new BadRequestError();
    jest
      .spyOn(businessUseCases, 'createBusiness')
      .mockRejectedValue(mockBadRequestError);
    await expect(
      businessController.createBusiness(mockCreateBusinessVM),
    ).rejects.toEqual(mockBadRequestError);
  });

  it('updateBusiness_error_request', async () => {
    const mockUpdateBusinessVM = new UpdateBusinessVM();
    const mockBadRequestError = new BadRequestError();
    jest
      .spyOn(businessUseCases, 'updateBusiness')
      .mockRejectedValue(mockBadRequestError);
    await expect(
      businessController.updateBusiness(mockUpdateBusinessVM, '1'),
    ).rejects.toEqual(mockBadRequestError);
  });

  it('updateBusiness_error_notFound', async () => {
    const mockUpdateBusinessVM = new UpdateBusinessVM();
    const mockNotFoundError = new NotFoundError();
    jest
      .spyOn(businessUseCases, 'updateBusiness')
      .mockRejectedValue(mockNotFoundError);
    await expect(
      businessController.updateBusiness(mockUpdateBusinessVM, '1'),
    ).rejects.toEqual(mockNotFoundError);
  });

  it('deleteBusiness', async () => {
    const mockBusinessVM = BusinessVM.toViewModel(BUSINESS);
    jest.spyOn(businessUseCases, 'deleteBusiness').mockResolvedValue(BUSINESS);
    const result = await businessController.deleteBusiness('1');
    expect(result).toEqual(mockBusinessVM);
  });
  it('updateBusiness_mock', async () => {
    jest.spyOn(businessUseCases, 'updateBusiness').mockResolvedValue(BUSINESS);

    const updateBusinessVM = new UpdateBusinessVM();
    updateBusinessVM.nom_comercio = 'Test Business';
    updateBusinessVM.aforo_maximo = 50;
    await businessController.updateBusiness(updateBusinessVM, '1');
    expect(businessUseCases.updateBusiness).toHaveBeenCalledWith(
      '1',
      expect.any(BusinessModel),
    );
  });
});
