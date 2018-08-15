import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { AgileSystem } from '../entities/agile_system'
import { WorkTeamMember } from '../entities/work_team_member'
@Entity({ name: 'agile_system_user' })
export class AgileSystemUser {
  @PrimaryGeneratedColumn('uuid', { name: 'agile_system_user_id' })
  agileSystemUserId: string

  @Column('varchar', { name: 'agile_system_user_name' })
  agileSystemUserName: string

  @ManyToOne(type => AgileSystem)
  @JoinColumn({ name: 'agile_system_id' })
  agileSystem: AgileSystem

  @ManyToOne(type => WorkTeamMember)
  @JoinColumn({ name: 'work_team_member_id' })
  workTeamMember: WorkTeamMember

  @Column('tinyint', { name: 'active' })
  active: boolean

}
