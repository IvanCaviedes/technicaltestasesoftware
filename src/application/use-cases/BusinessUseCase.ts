import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/domain/services/CommonService';
import { Comercios } from 'src/infrastructure/database/mapper/Business.entity';
import { BusinessModel } from 'src/domain/models/Business';
import { DeleteResult, Like, Repository } from 'typeorm';
import { PaginationResponseVM } from 'src/presentation/view-models/Common';

@Injectable()
export class BusinessUseCases {
  constructor(
    @InjectRepository(Comercios)
    private businessRepository: Repository<Comercios>,
    private readonly commonService: CommonService<BusinessModel>,
  ) {}

  async allBusiness(query): Promise<PaginationResponseVM<BusinessModel>> {
    const take = query.take || 10;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';

    const data = await this.businessRepository.findAndCount({
      where: { nom_comercio: Like('%' + keyword + '%') },
      relations: ['servicios'],
      take: take,
      skip: skip,
    });

    return this.commonService.paginateResponse(data, page, take);
  }

  async getOneBusinessByField(
    field: string,
    value: string,
  ): Promise<BusinessModel> {
    let businessConsulted = await this.businessRepository.find({
      where: { [field]: value },
    });
    if (!businessConsulted.length) {
      throw new HttpException(
        `The business consulted with field:${field} and value:${value} has not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return businessConsulted[0];
  }

  async createBusiness(bussines: BusinessModel): Promise<BusinessModel> {
    return await this.businessRepository
      .save(bussines)
      .then((business) => business)
      .catch((error) => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      });
  }
  async updateBusiness(id, bussines: BusinessModel): Promise<BusinessModel> {
    let businessConsulted = await this.getOneBusinessByField('id_comercio', id);
    const updatedBusiness = Object.assign(businessConsulted, bussines);
    return this.businessRepository.save(updatedBusiness);
  }

  async deleteBusiness(id): Promise<DeleteResult> {
    return await this.businessRepository.delete(id);
  }
}
