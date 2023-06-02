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
  ApiParam,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ServiceUseCases } from 'src/application/use-cases/ServiceUseCase';
import { ServicesModel } from 'src/domain/models/Services';

import { PaginationResponseVM, QueryPaginationVM } from '../view-models/Common';
import {
  CreateServiceVM,
  ServiceVM,
  UpdateServiceVM,
} from 'src/presentation/view-models/Services';
import { NotFoundError } from '../errors/NotFoundError';
import { BadRequestError } from '../errors/BadRequestError';
import { UnprocessableEntityError } from '../errors/UnprocessableEntityError';

@ApiTags('Services')
@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesUseCases: ServiceUseCases) {}

  @Get()
  @ApiOperation({
    summary: 'All services with relations with services and turns',
  })
  @ApiOkResponse({
    description: 'All Services fetched.',
    type: [PaginationResponseVM<ServicesModel>],
  })
  allServices(
    @Query() query: QueryPaginationVM,
  ): Promise<PaginationResponseVM<ServicesModel>> {
    return this.servicesUseCases.allServices(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find one service by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The service id to search',
  })
  @ApiOkResponse({ description: 'Service founded.', type: ServiceVM })
  @ApiNotFoundResponse({
    description: 'services cannot be founded.',
    type: NotFoundError,
  })
  async servicesById(@Param('id') idBusness: string): Promise<ServiceVM> {
    const service = await this.servicesUseCases.getOneServiceByField(
      'id_servicio',
      idBusness,
    );
    return ServiceVM.toViewModel(service);
  }

  @Post(':idComercio')
  @ApiOperation({
    summary: 'Create a services',
  })
  @ApiCreatedResponse({ description: 'services created.', type: ServiceVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating services',
    type: UnprocessableEntityError,
  })
  async createService(
    @Body() service: CreateServiceVM,
    @Param('idComercio') idComercio: string,
  ): Promise<ServiceVM> {
    const serviceResponse = await this.servicesUseCases.createService(
      CreateServiceVM.fromViewModel(service),
      idComercio,
    );
    return ServiceVM.toViewModel(serviceResponse);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an services',
  })
  @ApiCreatedResponse({ description: 'services updated.', type: ServiceVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while updating services',
    type: UnprocessableEntityError,
  })
  async updateService(
    @Body() service: UpdateServiceVM,
    @Param('id') idService: string,
  ): Promise<ServiceVM> {
    const serviceResponse = await this.servicesUseCases.updataService(
      idService,
      UpdateServiceVM.fromViewModel(service),
    );
    return ServiceVM.toViewModel(serviceResponse);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a services with id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The services id',
  })
  @ApiOkResponse({ description: 'services deleted.', type: ServiceVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  async deleteService(@Param('id') idService: string): Promise<ServiceVM> {
    const serviceResponse = await this.servicesUseCases.deleteService(
      idService,
    );
    return ServiceVM.toViewModel(serviceResponse);
  }
}
