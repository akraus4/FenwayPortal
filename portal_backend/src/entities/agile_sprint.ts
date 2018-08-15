import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { AgileSystem } from '../entities/agile_system'
@Entity({ name: 'agile_sprint' })
export class AgileSprint {
  @PrimaryColumn('uuid', { name: 'agile_sprint_id' })
  agileSprintId: string

  @Column('varchar', { name: 'agile_sprint_name' })
  agileSprintName: string

  @ManyToOne(type => AgileSystem)
  @JoinColumn({ name: 'agile_system_id' })
  agileSystem: AgileSystem

  @Column('varchar', { name: 'sprint_description' })
  sprintDscription: number

  @Column('varchar', { name: 'sprint_start_date' })
  sprintStartDate: Date

  @Column('varchar', { name: 'sprint_end_date' })
  sprintEndDate: Date
}
