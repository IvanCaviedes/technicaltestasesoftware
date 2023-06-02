import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/domain/services/CommonService';
import { Turnos } from 'src/infrastructure/database/mapper/Turn.entity';
import { Repository } from 'typeorm';
import {
  PaginationResponseVM,
  QueryPaginationVM,
} from 'src/presentation/view-models/Common';
import { ServiceUseCases } from './ServiceUseCase';
import { TurnModel } from 'src/domain/models/Turn';

@Injectable()
export class TurnUseCases {
  constructor(
    @InjectRepository(Turnos)
    private turnRepository: Repository<Turnos>,
    private readonly serviceUseCases: ServiceUseCases,
    private readonly commonService: CommonService,
  ) {}

  async allTurns(
    query: QueryPaginationVM,
  ): Promise<PaginationResponseVM<TurnModel>> {
    const take = query.take || 10;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const data = await this.turnRepository.findAndCount({
      relations: ['id_servicio', 'id_servicio.id_comercio'],
      take: take,
      skip: skip,
    });

    return this.commonService.paginateResponse(data, page, take);
  }

  async getOneTurnByField(field: string, value: string): Promise<TurnModel> {
    const turnConsulted = await this.turnRepository.find({
      where: { [field]: value },
      relations: ['id_servicio'],
    });
    if (!turnConsulted.length) {
      throw new HttpException(
        `The turn consulted with field:${field} and value:${value} has not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return turnConsulted[0];
  }

  async createTurn(turn: TurnModel, idService: string): Promise<TurnModel> {
    if (!turn.estado) {
      turn.estado = false;
    }
    const service = await this.serviceUseCases.getOneServiceByField(
      'id_servicio',
      idService,
    );
    turn.id_servicio = service;
    turn.estado = false;
    return await this.turnRepository
      .save(turn)
      .then((turn) => turn)
      .catch((error) => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      });
  }

  async updateTurn(id: string, turn: TurnModel): Promise<TurnModel> {
    if (turn.id_servicios) {
      const servicio = await this.serviceUseCases.getOneServiceByField(
        'id_servicio',
        String(turn.id_servicios),
      );
      turn.id_servicio = servicio;
    }
    const turnConsulted = await this.getOneTurnByField('id_turno', id);
    const updatedTurn = Object.assign(turnConsulted, turn);
    return this.turnRepository.save(updatedTurn);
  }

  async deleteTurn(id: string): Promise<TurnModel> {
    const turnConsulted = await this.turnRepository.findBy({ id_turno: +id });
    await this.turnRepository.delete(id);
    return turnConsulted[0];
  }
}
