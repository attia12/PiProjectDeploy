export class LettreDeMotivationDto {
    description: string;
    cv: File;
  
    constructor(description: string, cv: File) {
      this.description = description;
      this.cv = cv;
    }
  }
  