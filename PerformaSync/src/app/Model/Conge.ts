export enum StatutCon{
    ENATTENTE = "En Attente",
    VALIDE = "Validé",
    REFUSE = "Refusé"
  }
  
  export enum TypeCon{
    CONGEPAYES = "Congé payés",
    RTT = "Rtt",
    MALADIE = "maladie"
  }
  export class Conge{
    
    date_deb:Date;
    date_fin:Date;
    jours_restants:number;
    statutCon: StatutCon;
    typeCon: TypeCon;
  
    constructor( date_deb: Date, date_fin: Date, jours_restants: number, status: StatutCon, type: TypeCon) {
     
      this.date_deb = date_deb;
      this.date_fin = date_fin;
      this.jours_restants = jours_restants;
      this.statutCon = status;
      this.typeCon = type;
    }
  
  }