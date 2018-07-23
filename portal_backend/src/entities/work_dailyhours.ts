import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { WorkTeamMember } from '../entities/work_team_member'

@Entity({ name: 'work_dailyhours' })
export class WorkDailyHours {
  @PrimaryGeneratedColumn('uuid', { name: 'work_dailyhours_id' })
  work_dailyhours_id: string

  // @Column()
  // work_team_member_id: string;
  @ManyToOne(type => WorkTeamMember)
  @JoinColumn({ name: 'work_team_member_id' })
  work_team_member: WorkTeamMember

  @Column({ name: 'work_date' })
  work_date: Date

  @Column({ name: 'hours' })
  hours: number
}
