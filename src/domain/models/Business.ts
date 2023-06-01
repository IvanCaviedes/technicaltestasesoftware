export class BusinessModel {
  id_comercio?: number;
  nom_comercio: string;
  aforo_maximo: number;

  constructor(nom_comercio, aforo_maximo) {
    this.nom_comercio = nom_comercio;
    this.aforo_maximo = aforo_maximo;
  }
}
