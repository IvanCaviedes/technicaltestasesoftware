import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
@Controller('api/business')
export class BusinessController {
  @Get()
  allBusiness() {}
  @Get(':id')
  businessById() {}
  @Post()
  createBusiness() {}
  @Patch(':id')
  updateBusiness() {}
  @Delete(':id')
  deleteBusiness() {}
}
