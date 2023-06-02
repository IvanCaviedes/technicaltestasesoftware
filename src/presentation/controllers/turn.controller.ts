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

import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
  ApiParam,
} from '@nestjs/swagger';

import { TurnUseCases } from 'src/application/use-cases/TurnUseCase';
import { TurnModel } from 'src/domain/models/Turn';

import {
  PaginationResponseVM,
  ParamsAutoGenerateTurnVM,
  QueryPaginationVM,
} from '../view-models/Common';
import { CreateTurnVM, UpdateTurnVM } from 'src/presentation/view-models/Turn';

import { NotFoundError } from '../errors/NotFoundError';
import { TurnVM } from '../view-models/Turn/TurnVM';
import { BadRequestError } from '../errors/BadRequestError';
import { UnprocessableEntityError } from '../errors/UnprocessableEntityError';

@ApiTags('Turns')
@Controller('api/turns')
export class TurnController {
  constructor(private readonly turnUseCases: TurnUseCases) {}

  @Get()
  @ApiOperation({
    summary: 'All turns with relations with business and services',
  })
  @ApiOkResponse({
    description: 'All Services fetched.',
    type: [PaginationResponseVM<TurnModel>],
  })
  allSTurn(
    @Query() query: QueryPaginationVM,
  ): Promise<PaginationResponseVM<TurnModel>> {
    return this.turnUseCases.allTurns(query);
  }

  @Get('auto-generate-turn')
  @ApiOperation({
    summary: 'auto generate turn with stored procedure',
  })
  @ApiOkResponse({ description: 'created turns.', type: [TurnVM] })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while auto generating turn',
    type: UnprocessableEntityError,
  })
  async generateTurns(
    @Body() params: ParamsAutoGenerateTurnVM,
  ): Promise<TurnModel[]> {
    return await this.turnUseCases.generateTurn(params);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find one turn by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The turn id to search',
  })
  @ApiOkResponse({ description: 'Service founded.', type: TurnVM })
  @ApiNotFoundResponse({
    description: 'turn cannot be founded.',
    type: NotFoundError,
  })
  async turnById(@Param('id') idTurn: string): Promise<TurnVM> {
    const turnRespomse = await this.turnUseCases.getOneTurnByField(
      'id_servicio',
      idTurn,
    );
    return TurnVM.toViewModel(turnRespomse);
  }

  @Post(':idService')
  @ApiOperation({
    summary: 'Create a turn',
  })
  @ApiCreatedResponse({ description: 'turn created.', type: TurnVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating services',
    type: UnprocessableEntityError,
  })
  async createTurn(
    @Body() turn: CreateTurnVM,
    @Param('idService') idService: string,
  ): Promise<TurnVM> {
    const turnRespomse = await this.turnUseCases.createTurn(
      CreateTurnVM.fromViewModel(turn),
      idService,
    );
    return TurnVM.toViewModel(turnRespomse);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an turn',
  })
  @ApiCreatedResponse({ description: 'turn updated.', type: TurnVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while updating services',
    type: UnprocessableEntityError,
  })
  async updateTurn(
    @Body() turn: UpdateTurnVM,
    @Param('id') idTurn: string,
  ): Promise<TurnVM> {
    const turnRespomse = await this.turnUseCases.updateTurn(
      idTurn,
      UpdateTurnVM.fromViewModel(turn),
    );
    return TurnVM.toViewModel(turnRespomse);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a turn with id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The turn id',
  })
  @ApiOkResponse({ description: 'turn deleted.', type: TurnVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  async deleteTurn(@Param('id') idTurn: string): Promise<TurnVM> {
    const turnRespomse = await this.turnUseCases.deleteTurn(idTurn);
    return TurnVM.toViewModel(turnRespomse);
  }
}
