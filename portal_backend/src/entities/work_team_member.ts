import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { WorkUser } from '../entities/work_user'
import { WorkTeam } from '../entities/work_team'
@Entity({ name: 'work_team_member' })
export class WorkTeamMember {

  @PrimaryGeneratedColumn('uuid', { name: 'work_team_member_id' })
  workTeamMemberId: string

  @ManyToOne(type => WorkTeam)
  @JoinColumn({ name: 'work_team_id' })
  workTeam: WorkTeam

  @ManyToOne(type => WorkUser)
  @JoinColumn({ name: 'work_user_id' })
  workUser: WorkUser

  @Column('tinyint', { name: 'active' })
  active: boolean
}
