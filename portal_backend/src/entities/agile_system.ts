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
  agile_system_id: string

  @Column('varchar', { name: 'agile_system_name' })
  agile_system_name: string

  @Column('varchar', { name: 'agile_system_type' })
  agile_system_type: string

  // @Column('uuid', {name : "work_team_id"})
  // work_team_id: string;

  @Column('tinyint', { name: 'active' })
  active: boolean

  @ManyToOne(type => WorkTeam)
  @JoinColumn({ name: 'work_team_id' })
  work_team: WorkTeam
}
