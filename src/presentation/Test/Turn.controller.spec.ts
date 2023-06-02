import { Test, TestingModule } from '@nestjs/testing';
import { TurnModule } from 'src/infrastructure/ioc/turns.module';
import { TurnController } from '../controllers/turn.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setEnvironment } from 'src/infrastructure/environments';
import { TypeOrmConfigService } from 'ormconfig';
import { TurnUseCases } from 'src/application/use-cases/TurnUseCase';
import { BadRequestError } from '../errors/BadRequestError';
import { NotFoundError } from '../errors/NotFoundError';
import { TurnModel } from 'src/domain/models/Turn';
import { TurnVM } from '../view-models/Turn/TurnVM';
import { CreateTurnVM, UpdateTurnVM } from '../view-models/Turn';

describe('TurnController', () => {
  let turnController: TurnController;
  let turnUseCases: TurnUseCases;

  const TURN = new TurnModel(new Date(), new Date(), new Date());

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TurnModule,
        ConfigModule.forRoot({ envFilePath: setEnvironment(), isGlobal: true }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
      ],
    }).compile();

    turnController = module.get<TurnController>(TurnController);
    turnUseCases = module.get<TurnUseCases>(TurnUseCases);
  });

  it('should be defined', () => {
    expect(turnController).toBeDefined();
  });
  it('allBusiness', async () => {
    const mockQuery = {
      take: 10,
      page: 1,
      keyword: '',
    };
    const mockPaginationResponse = {
      statusCode: 'success',
      data: [TURN],
      count: 1,
      currentPage: 1,
      nextPage: null,
      prevPage: null,
      lastPage: 1,
    };
    jest
      .spyOn(turnUseCases, 'allTurns')
      .mockImplementation(async () => mockPaginationResponse);
    const result = await turnController.allSTurn(mockQuery);
    expect(result).toEqual(mockPaginationResponse);
  });

  it('businessById', async () => {
    jest
      .spyOn(turnUseCases, 'getOneTurnByField')
      .mockImplementation(async () => TURN);
    const mockBusinessVM = TurnVM.toViewModel(TURN);
    const result = await turnController.turnById('1');
    expect(result).toEqual(mockBusinessVM);
  });

  it('createBusiness_error', async () => {
    const mockCreateBusinessVM = new CreateTurnVM();
    const mockBadRequestError = new BadRequestError();
    jest
      .spyOn(turnUseCases, 'createTurn')
      .mockRejectedValue(mockBadRequestError);
    await expect(
      turnController.createTurn(mockCreateBusinessVM, '1'),
    ).rejects.toEqual(mockBadRequestError);
  });

  it('updateBusiness_error_request', async () => {
    const mockUpdateBusinessVM = new UpdateTurnVM();
    const mockBadRequestError = new BadRequestError();
    jest
      .spyOn(turnUseCases, 'updateTurn')
      .mockRejectedValue(mockBadRequestError);
    await expect(
      turnController.updateTurn(mockUpdateBusinessVM, '1'),
    ).rejects.toEqual(mockBadRequestError);
  });

  it('updateBusiness_error_notFound', async () => {
    const mockUpdateBusinessVM = new UpdateTurnVM();
    const mockNotFoundError = new NotFoundError();
    jest.spyOn(turnUseCases, 'updateTurn').mockRejectedValue(mockNotFoundError);
    await expect(
      turnController.updateTurn(mockUpdateBusinessVM, '1'),
    ).rejects.toEqual(mockNotFoundError);
  });

  it('deleteBusiness', async () => {
    const mockBusinessVM = TurnVM.toViewModel(TURN);
    jest.spyOn(turnUseCases, 'deleteTurn').mockResolvedValue(TURN);
    const result = await turnController.deleteTurn('1');
    expect(result).toEqual(mockBusinessVM);
  });
  it('updateBusiness_mock', async () => {
    jest.spyOn(turnUseCases, 'updateTurn').mockResolvedValue(TURN);

    const updateBusinessVM = new UpdateTurnVM();
    updateBusinessVM.fecha_turno = new Date('2014/06/21');
    await turnController.updateTurn(updateBusinessVM, '1');
    expect(turnUseCases.updateTurn).toHaveBeenCalledWith(
      '1',
      expect.any(TurnModel),
    );
  });
});
