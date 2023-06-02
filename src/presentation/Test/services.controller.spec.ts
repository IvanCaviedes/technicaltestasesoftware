import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUseCases } from 'src/application/use-cases/ServiceUseCase';
import { ServicesController } from '../controllers/services.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'ormconfig';
import { setEnvironment } from 'src/infrastructure/environments';
import { ServicesModule } from 'src/infrastructure/ioc/services.module';
import { ServicesModel } from 'src/domain/models/Services';
import {
  CreateServiceVM,
  ServiceVM,
  UpdateServiceVM,
} from '../view-models/Services';
import { BadRequestError } from '../errors/BadRequestError';
import { NotFoundError } from '../errors/NotFoundError';

describe('ServicesController', () => {
  let servicesController: ServicesController;
  let servicesUseCases: ServiceUseCases;

  const SERVICE = new ServicesModel(
    'SERVICIO1',
    new Date(),
    new Date('03/06/2023'),
    30,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ServicesModule,
        ConfigModule.forRoot({ envFilePath: setEnvironment(), isGlobal: true }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
      ],
    }).compile();

    servicesController = module.get<ServicesController>(ServicesController);
    servicesUseCases = module.get<ServiceUseCases>(ServiceUseCases);
  });

  it('should be defined', () => {
    expect(servicesController).toBeDefined();
  });

  it('allServices', async () => {
    const mockQuery = {
      take: 10,
      page: 1,
      keyword: '',
    };
    const mockPaginationResponse = {
      statusCode: 'success',
      data: [SERVICE],
      count: 1,
      currentPage: 1,
      nextPage: null,
      prevPage: null,
      lastPage: 1,
    };
    jest
      .spyOn(servicesUseCases, 'allServices')
      .mockImplementation(async () => mockPaginationResponse);
    const result = await servicesController.allServices(mockQuery);
    expect(result).toEqual(mockPaginationResponse);
  });
  it('ServiceById', async () => {
    jest
      .spyOn(servicesUseCases, 'getOneServiceByField')
      .mockImplementation(async () => SERVICE);
    const mockServiceVM = ServiceVM.toViewModel(SERVICE);
    const result = await servicesController.servicesById('1');
    expect(result).toEqual(mockServiceVM);
  });

  it('createService_error', async () => {
    const mockCreateServiceVM = new CreateServiceVM();
    const mockBadRequestError = new BadRequestError();
    jest
      .spyOn(servicesUseCases, 'createService')
      .mockRejectedValue(mockBadRequestError);
    await expect(
      servicesController.createService(mockCreateServiceVM, '1'),
    ).rejects.toEqual(mockBadRequestError);
  });

  it('updateService_error_request', async () => {
    const mockUpdateBusinessVM = new UpdateServiceVM();
    const mockBadRequestError = new BadRequestError();
    jest
      .spyOn(servicesUseCases, 'updataService')
      .mockRejectedValue(mockBadRequestError);
    await expect(
      servicesController.updateService(mockUpdateBusinessVM, '1'),
    ).rejects.toEqual(mockBadRequestError);
  });

  it('updateService_error_notFound', async () => {
    const mockUpdateBusinessVM = new UpdateServiceVM();
    const mockNotFoundError = new NotFoundError();
    jest
      .spyOn(servicesUseCases, 'updataService')
      .mockRejectedValue(mockNotFoundError);
    await expect(
      servicesController.updateService(mockUpdateBusinessVM, '1'),
    ).rejects.toEqual(mockNotFoundError);
  });

  it('deleteService', async () => {
    const mockBusinessVM = ServiceVM.toViewModel(SERVICE);
    jest.spyOn(servicesUseCases, 'deleteService').mockResolvedValue(SERVICE);
    const result = await servicesController.deleteService('1');
    expect(result).toEqual(mockBusinessVM);
  });

  it('updateService_mock', async () => {
    jest.spyOn(servicesUseCases, 'updataService').mockResolvedValue(SERVICE);

    const updateBusinessVM = new UpdateServiceVM();
    updateBusinessVM.duracion = 120;

    await servicesController.updateService(updateBusinessVM, '1');
    expect(servicesUseCases.updataService).toHaveBeenCalledWith(
      '1',
      expect.any(ServicesModel),
    );
  });
});
