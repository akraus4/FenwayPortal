import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { AgileSystem } from '../entities/agile_system'
@Entity({ name: 'agile_stage' })
export class AgileStage {
  @PrimaryGeneratedColumn('uuid', { name: 'agile_stage_id' })
  agileStageId: string

  @Column('varchar', { name: 'agile_stage_name' })
  agileStageName: string

  @Column('varchar', { name: 'agile_stage_technical_requirements' })
  agileStageTechnicalRrequirements: string

  @Column('varchar', { name: 'agile_stage_behavioral_requirements' })
  agileStageBehavioralRrequirements: string

  @Column('varchar', { name: 'agile_stage_progression_requirements' })
  agileStageProgressionRrequirements: string
}
