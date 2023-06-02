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
import { BusinessUseCases } from 'src/application/use-cases/BusinessUseCase';
import { BusinessModel } from 'src/domain/models/Business';

import {
  CreateBusinessVM,
  UpdateBusinessVM,
} from 'src/presentation/view-models/Business';
import { PaginationResponseVM, QueryPaginationVM } from '../view-models/Common';
import { BusinessVM } from '../view-models/Business/BusinessVM';
import { NotFoundError } from 'src/presentation/errors/NotFoundError';
import { BadRequestError } from '../errors/BadRequestError';
import { UnprocessableEntityError } from '../errors/UnprocessableEntityError';

@ApiTags('Business')
@Controller('api/business')
export class BusinessController {
  constructor(private readonly businessUseCases: BusinessUseCases) {}

  @Get()
  @ApiOperation({
    summary: 'All business with relations with services and turns',
  })
  @ApiOkResponse({
    description: 'All business fetched.',
    type: [PaginationResponseVM<BusinessModel>],
  })
  allBusiness(
    @Query() query: QueryPaginationVM,
  ): Promise<PaginationResponseVM<BusinessModel>> {
    return this.businessUseCases.allBusiness(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find one business by id',
  })
  @ApiOkResponse({ description: 'business founded.', type: BusinessVM })
  @ApiNotFoundResponse({
    description: 'business cannot be founded.',
    type: NotFoundError,
  })
  async businessById(@Param('id') idBusness: string): Promise<BusinessModel> {
    return this.businessUseCases.getOneBusinessByField(
      'id_comercio',
      idBusness,
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Create a business',
  })
  @ApiCreatedResponse({ description: 'Business created.', type: BusinessVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating Business',
    type: UnprocessableEntityError,
  })
  async createBusiness(
    @Body() business: CreateBusinessVM,
  ): Promise<BusinessVM> {
    const businessResponse = await this.businessUseCases.createBusiness(
      CreateBusinessVM.fromViewModel(business),
    );
    return BusinessVM.toViewModel(businessResponse);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an Business',
  })
  @ApiCreatedResponse({ description: 'Business updated.', type: BusinessVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while updating Business',
    type: UnprocessableEntityError,
  })
  async updateBusiness(
    @Body() business: UpdateBusinessVM,
    @Param('id') idBusness: string,
  ): Promise<BusinessVM> {
    const businessResponse = await this.businessUseCases.updateBusiness(
      idBusness,
      UpdateBusinessVM.fromViewModel(business),
    );
    return BusinessVM.toViewModel(businessResponse);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a business with id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The business id',
  })
  @ApiOkResponse({ description: 'business deleted.', type: BusinessVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  async deleteBusiness(@Param('id') idBusness: string): Promise<BusinessVM> {
    const bussiness = await this.businessUseCases.deleteBusiness(idBusness);
    return BusinessVM.toViewModel(bussiness);
  }
}
