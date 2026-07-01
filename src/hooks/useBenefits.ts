import { useState, useEffect, useMemo } from 'react';
import { IBenefit, IUser } from '@/lib/types';
import { benefitsData as fallbackBenefits } from '@/lib/constants';

export interface EvaluatedBenefit {
  benefit: IBenefit;
  status: 'eligible' | 'ineligible' | 'pending';
  failures: string[];
  successes: string[];
  isOffline: boolean;
}

export function useBenefits(user: IUser | null) {
  const [benefitsData, setBenefitsData] = useState<IBenefit[]>([]);
  const [isLoadingBenefits, setIsLoadingBenefits] = useState(true);

  useEffect(() => {
    async function fetchBenefits() {
      try {
        const res = await fetch('/api/benefits');
        if (res.ok) {
          const data = await res.json();
          setBenefitsData(data);
        } else {
          setBenefitsData(fallbackBenefits);
        }
      } catch (e) {
        console.error('Failed to fetch benefits, using fallback', e);
        setBenefitsData(fallbackBenefits);
      } finally {
        setIsLoadingBenefits(false);
      }
    }
    fetchBenefits();
  }, []);

  const evaluatedBenefits = useMemo(() => {
    if (!user) return { eligible: [], pending: [], ineligible: [] };

    const eligible: EvaluatedBenefit[] = [];
    const pending: EvaluatedBenefit[] = [];
    const ineligible: EvaluatedBenefit[] = [];

    // En una implementación real, 'offlineInstitutions' vendría de una API o estado global
    const offlineInstitutions: string[] = []; // Simulación vacía por ahora

    benefitsData.forEach(benefit => {
      const failures: string[] = [];
      const successes: string[] = [];
      const req = benefit.reqs;

      const isOffline = benefit.linkStatus === 'down' || offlineInstitutions.includes(benefit.institution);

      // Evaluación de Género
      if (req.gender) {
        if (user.gender !== 'Real' && user.gender !== req.gender) {
          if (benefit.reasons.gender) failures.push(benefit.reasons.gender);
        } else {
          if (benefit.successes.gender) successes.push(benefit.successes.gender);
        }
      }

      // Evaluación de Edad
      if (req.minAge !== undefined) {
        if (user.age < req.minAge) {
          if (benefit.reasons.minAge) failures.push(benefit.reasons.minAge);
        } else {
          if (benefit.successes.minAge) successes.push(benefit.successes.minAge);
        }
      }

      if (req.maxAge !== undefined) {
        if (user.age > req.maxAge) {
          if (benefit.reasons.maxAge) failures.push(benefit.reasons.maxAge);
        } else {
          if (benefit.successes.maxAge) successes.push(benefit.successes.maxAge);
        }
      }

      // Evaluación de Ingresos (RSH)
      if (req.maxIncome !== undefined) {
        if (user.income > req.maxIncome) {
          if (benefit.reasons.maxIncome) failures.push(benefit.reasons.maxIncome);
        } else {
          if (benefit.successes.maxIncome) successes.push(benefit.successes.maxIncome);
        }
      }

      // Evaluación de Estudiante
      if (req.isStudent !== undefined) {
        if (req.isStudent && !user.isStudent) {
          if (benefit.reasons.isStudent) failures.push(benefit.reasons.isStudent);
        } else {
          if (benefit.successes.isStudent) successes.push(benefit.successes.isStudent);
        }
      }

      // Evaluación Laboral
      if (req.hasContract !== undefined) {
        if (req.hasContract && !user.hasContract) {
          if (benefit.reasons.hasContract) failures.push(benefit.reasons.hasContract);
        } else {
          if (benefit.successes.hasContract) successes.push(benefit.successes.hasContract);
        }
      }

      if (req.minMonthsWorked !== undefined) {
        if (user.monthsWorked < req.minMonthsWorked) {
          if (benefit.reasons.minMonthsWorked) failures.push(benefit.reasons.minMonthsWorked);
        } else {
          if (benefit.successes.minMonthsWorked) successes.push(benefit.successes.minMonthsWorked);
        }
      }

      // Clasificación
      let status: 'eligible' | 'ineligible' | 'pending' = 'eligible';
      
      if (failures.length > 0) {
        status = 'ineligible';
      } else if (benefit.manualReqs && benefit.manualReqs.length > 0) {
        status = 'pending';
      }

      const evaluated: EvaluatedBenefit = {
        benefit,
        status,
        failures,
        successes,
        isOffline
      };

      if (status === 'eligible') eligible.push(evaluated);
      else if (status === 'pending') pending.push(evaluated);
      else ineligible.push(evaluated);
    });

    return { eligible, pending, ineligible };
  }, [user, benefitsData]);

  return { ...evaluatedBenefits, isLoadingBenefits };
}
