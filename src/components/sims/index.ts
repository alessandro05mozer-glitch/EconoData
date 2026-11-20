import type { ComponentType } from 'react'
import { SupplyDemandSim } from './SupplyDemandSim'
import { ShiftsSim } from './ShiftsSim'
import { ElasticitySim } from './ElasticitySim'
import { ConsumerSim } from './ConsumerSim'
import { FirmSim } from './FirmSim'
import { LagrangeSim } from './LagrangeSim'
import { LinearSim } from './LinearSim'
import { DerivativeSim } from './DerivativeSim'
import { DiceSim } from './DiceSim'
import { GdpSim } from './GdpSim'

export const SIMS: Record<string, ComponentType> = {
  'oferta-demanda-imposto': SupplyDemandSim,
  'deslocamentos': ShiftsSim,
  'elasticidade': ElasticitySim,
  'consumidor-otimo': ConsumerSim,
  'custos-firma': FirmSim,
  'lagrange-tangencia': LagrangeSim,
  'sistema-2x2': LinearSim,
  'derivada-tangente': DerivativeSim,
  'dados-probabilidade': DiceSim,
  'pib-composicao': GdpSim,
}
