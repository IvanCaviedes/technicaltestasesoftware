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
import { ServiceUseCases } from 'src/application/use-cases/ServiceUseCase';
import { ServicesModel } from 'src/domain/models/Services';

import { PaginationResponseVM, QueryPaginationVM } from '../view-models/Common';
import {
  CreateServiceVM,
  UpdateServiceVM,
} from 'src/presentation/view-models/Services';

import { DeleteResult } from 'typeorm';

@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesUseCases: ServiceUseCases) {}

  @Get()
  allServices(
    @Query() query: QueryPaginationVM,
  ): Promise<PaginationResponseVM<ServicesModel>> {
    return this.servicesUseCases.allServices(query);
  }

  @Get(':id')
  servicesById(@Param('id') idBusness: string): Promise<ServicesModel> {
    return this.servicesUseCases.getOneServiceByField('id_servicio', idBusness);
  }

  @Post(':idComercio')
  createService(
    @Body() service: CreateServiceVM,
    @Param('idComercio') idComercio: string,
  ): Promise<ServicesModel> {
    return this.servicesUseCases.createService(
      CreateServiceVM.fromViewModel(service),
      idComercio,
    );
  }

  @Patch(':id')
  updateService(
    @Body() service: UpdateServiceVM,
    @Param('id') idService: string,
  ): Promise<ServicesModel> {
    return this.servicesUseCases.updataService(
      idService,
      UpdateServiceVM.fromViewModel(service),
    );
  }

  @Delete(':id')
  deleteService(@Param('id') idService: string): Promise<DeleteResult> {
    return this.servicesUseCases.deleteService(idService);
  }
}
