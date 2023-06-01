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

@Controller('api/business')
export class BusinessController {
  constructor(private readonly businessUseCases: BusinessUseCases) {}

  @Get()
  allBusiness(
    @Query() query: { take?: string; skip?: string; keyword?: string },
  ) {
    return this.businessUseCases.allBusiness(query);
  }
  @Get(':id')
  businessById() {
    return this.businessUseCases.getOneBusinessByField('id_comercio', '1');
  }
  @Post()
  createBusiness(@Body() business) {
    return this.businessUseCases.createBusiness(business);
  }
  @Patch(':id')
  updateBusiness(@Body() business, @Param('id') idBusness: string) {
    return this.businessUseCases.updataBusiness(idBusness, business);
  }

  @Delete(':id')
  deleteBusiness(@Param('id') idBusness: string) {
    return this.businessUseCases.deleteBusiness(idBusness);
  }
}
