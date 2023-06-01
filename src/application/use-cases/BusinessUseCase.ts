import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/domain/services/CommonService';
import { Comercios } from 'src/infrastructure/database/mapper/Business.entity';
import { BusinessModel } from 'src/domain/models/Business';
import { Like, Repository } from 'typeorm';

@Injectable()
export class BusinessUseCases {
  constructor(
    @InjectRepository(Comercios)
    private businessRepository: Repository<Comercios>,
    private readonly commonService: CommonService<BusinessModel>,
  ) {}

  async allBusiness(query) {
    const take = query.take || 10;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';

    const data = await this.businessRepository.findAndCount({
      where: { nom_comercio: Like('%' + keyword + '%') },
      take: take,
      skip: skip,
    });

    return this.commonService.paginateResponse(data, page, take);
  }

  async getOneBusinessByField(field: string, value: string) {
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

  async createBusiness(bussines) {
    return await this.businessRepository.save({
      nom_comercio: bussines.nom_comercio,
      aforo_maximo: bussines.aforo_maximo,
    });
  }
  async updataBusiness(id, bussines) {
    let businessConsulted = await this.getOneBusinessByField('id_comercio', id);
    const updatedBusiness = Object.assign(businessConsulted, bussines);
    return this.businessRepository.save(updatedBusiness);
  }

  deleteBusiness(id) {
    return this.businessRepository.delete(id);
  }
}
