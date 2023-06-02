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
import { BusinessUseCases } from 'src/application/use-cases/BusinessUseCase';
import { BusinessModel } from 'src/domain/models/Business';

import {
  CreateBusinessVM,
  UpdateBusinessVM,
} from 'src/presentation/view-models/Business';
import { PaginationResponseVM, QueryPaginationVM } from '../view-models/Common';
import { DeleteResult } from 'typeorm';

@Controller('api/business')
export class BusinessController {
  constructor(private readonly businessUseCases: BusinessUseCases) {}

  @Get()
  allBusiness(
    @Query() query: QueryPaginationVM,
  ): Promise<PaginationResponseVM<BusinessModel>> {
    return this.businessUseCases.allBusiness(query);
  }

  @Get(':id')
  businessById(@Param('id') idBusness: string): Promise<BusinessModel> {
    return this.businessUseCases.getOneBusinessByField(
      'id_comercio',
      idBusness,
    );
  }

  @Post()
  createBusiness(@Body() business: CreateBusinessVM): Promise<BusinessModel> {
    return this.businessUseCases.createBusiness(
      CreateBusinessVM.fromViewModel(business),
    );
  }

  @Patch(':id')
  updateBusiness(
    @Body() business: UpdateBusinessVM,
    @Param('id') idBusness: string,
  ): Promise<BusinessModel> {
    return this.businessUseCases.updateBusiness(
      idBusness,
      UpdateBusinessVM.fromViewModel(business),
    );
  }

  @Delete(':id')
  deleteBusiness(@Param('id') idBusness: string): Promise<DeleteResult> {
    return this.businessUseCases.deleteBusiness(idBusness);
  }
}
