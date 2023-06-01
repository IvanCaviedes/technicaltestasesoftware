import { EntitySchema } from 'typeorm';
import { BusinessModel } from 'src/domain/models/Business';

export const BusinessEntity = new EntitySchema<BusinessModel>({
  name: 'BusinessModel',
  tableName: 'comercios',
  target: BusinessModel,
  columns: {
    id_comercio: {
      type: Number,
      primary: true,
      generated: true,
    },
    nom_comercio: {
      type: String,
      nullable: false,
    },
    aforo_maximo: {
      type: Number,
      nullable: false,
    },
  },
});
