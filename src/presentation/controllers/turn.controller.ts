import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { TurnUseCases } from 'src/application/use-cases/TurnUseCase';
import { TurnModel } from 'src/domain/models/Turn';

import { PaginationResponseVM, QueryPaginationVM } from '../view-models/Common';
import { CreateTurnVM, UpdateTurnVM } from 'src/presentation/view-models/Turn';

import { DeleteResult } from 'typeorm';

@Controller('api/turns')
export class TurnController {
  constructor(private readonly turnUseCases: TurnUseCases) {}

  @Get()
  allServices(
    @Query() query: QueryPaginationVM,
  ): Promise<PaginationResponseVM<TurnModel>> {
    return this.turnUseCases.allTurns(query);
  }

  @Get(':id')
  turnById(@Param('id') idBusness: string): Promise<TurnModel> {
    return this.turnUseCases.getOneTurnByField('id_servicio', idBusness);
  }

  @Post(':idService')
  createService(
    @Body() turn: CreateTurnVM,
    @Param('idService') idService: string,
  ): Promise<TurnModel> {
    return this.turnUseCases.createTurn(
      CreateTurnVM.fromViewModel(turn),
      idService,
    );
  }

  @Patch(':id')
  updateService(
    @Body() turn: UpdateTurnVM,
    @Param('id') idTurn: string,
  ): Promise<TurnModel> {
    return this.turnUseCases.updateTurn(
      idTurn,
      UpdateTurnVM.fromViewModel(turn),
    );
  }

  @Delete(':id')
  deleteTurn(@Param('id') idTurn: string): Promise<DeleteResult> {
    return this.turnUseCases.deleteTurn(idTurn);
  }
}
