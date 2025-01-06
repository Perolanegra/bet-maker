import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { CompetitionService } from '../services/competition.service';

export const getCompetitionsResolver: ResolveFn<Observable<any>> = () => {
  const competitionService = inject(CompetitionService); // Injeta serviços
  return competitionService.getCompetitions(); // Chama o serviço e retorna os dados
};
