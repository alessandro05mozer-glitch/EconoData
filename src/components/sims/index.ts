import type { ComponentType } from 'react'
import { SupplyDemandSim } from './SupplyDemandSim'

export const SIMS: Record<string, ComponentType> = {
  'oferta-demanda-imposto': SupplyDemandSim,
}
