import { Controller, Get } from '@nestjs/common';
@Controller()
export class BusinessController {
  @Get()
  allBusiness() {
    return 'comercios';
  }
}
