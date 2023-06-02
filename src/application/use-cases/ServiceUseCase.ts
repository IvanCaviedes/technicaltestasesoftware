import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/domain/services/CommonService';
import { Servicios } from 'src/infrastructure/database/mapper/Services.entity';
import { ServicesModel } from 'src/domain/models/Services';
import { DeleteResult, Like, Repository } from 'typeorm';
import {
  PaginationResponseVM,
  QueryPaginationVM,
} from 'src/presentation/view-models/Common';
import { BusinessUseCases } from './BusinessUseCase';

@Injectable()
export class ServiceUseCases {
  constructor(
    @InjectRepository(Servicios)
    private serviceRepository: Repository<Servicios>,
    private readonly businessUseCases: BusinessUseCases,
    private readonly commonService: CommonService<ServicesModel>,
  ) {}

  async allServices(
    query: QueryPaginationVM,
  ): Promise<PaginationResponseVM<ServicesModel>> {
    const take = query.take || 10;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';

    const data = await this.serviceRepository.findAndCount({
      where: { nom_servicio: Like('%' + keyword + '%') },
      relations: ['id_comercio', 'turnos'],
      take: take,
      skip: skip,
    });

    return this.commonService.paginateResponse(data, page, take);
  }

  async getOneServiceByField(
    field: string,
    value: string,
  ): Promise<ServicesModel> {
    let serviceConsulted = await this.serviceRepository.find({
      where: { [field]: value },
      relations: ['id_comercio'],
    });
    if (!serviceConsulted.length) {
      throw new HttpException(
        `The service consulted with field:${field} and value:${value} has not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return serviceConsulted[0];
  }

  async createService(
    service: ServicesModel,
    idComercio: string,
  ): Promise<ServicesModel> {
    let comercio = await this.businessUseCases.getOneBusinessByField(
      'id_comercio',
      idComercio,
    );

    service.id_comercio = comercio;

    return await this.serviceRepository
      .save(service)
      .then((service) => service)
      .catch((error) => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      });
  }

  async updataService(
    id: string,
    service: ServicesModel,
  ): Promise<ServicesModel> {
    if (service.id_comercios) {
      let comercio = await this.businessUseCases.getOneBusinessByField(
        'id_comercio',
        String(service.id_comercios),
      );
      service.id_comercio = comercio;
    }
    let serviceConsulted = await this.getOneServiceByField('id_servicio', id);
    const updatedService = Object.assign(serviceConsulted, service);
    return this.serviceRepository.save(updatedService);
  }

  async deleteService(id: string): Promise<DeleteResult> {
    return await this.serviceRepository.delete(id);
  }
}
