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
import { IpcaSim } from './IpcaSim'
import { MonopolySim } from './MonopolySim'
import { NashSim } from './NashSim'
import { FisherSim } from './FisherSim'
import { GrowthSim } from './GrowthSim'
import { CltSim } from './CltSim'
import { OlsSim } from './OlsSim'
import { IsLmSim } from './IsLmSim'
import { LorenzSim } from './LorenzSim'
import { RealTimeline } from './RealTimeline'
import { CircularFlow } from './CircularFlow'

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
  'ipca-real': IpcaSim,
  'monopolio': MonopolySim,
  'jogo-nash': NashSim,
  'juros-reais': FisherSim,
  'crescimento-exp': GrowthSim,
  'tcl': CltSim,
  'regressao-mqo': OlsSim,
  'is-lm': IsLmSim,
  'lorenz-gini': LorenzSim,
  'linha-do-tempo-real': RealTimeline,
  'fluxo-circular': CircularFlow,
}
