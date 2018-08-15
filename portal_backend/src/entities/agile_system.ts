import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { WorkTeam } from '../entities/work_team'

@Entity({ name: 'agile_system' })
export class AgileSystem {
  @PrimaryGeneratedColumn('uuid', { name: 'agile_system_id' })
  agileSystemId: string

  @Column('varchar', { name: 'agile_system_name' })
  agileSystemName: string

  @Column('varchar', { name: 'agile_system_type' })
  agileSystemType: string

  @Column('tinyint', { name: 'active' })
  active: boolean

  @ManyToOne(type => WorkTeam)
  @JoinColumn({ name: 'work_team_id' })
  workTeam: WorkTeam
}
