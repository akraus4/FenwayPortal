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
  workDailyhoursId: string

  @ManyToOne(type => WorkTeamMember)
  @JoinColumn({ name: 'work_team_member_id' })
  workTeamMember: WorkTeamMember

  @Column({ name: 'work_date' })
  workDate: Date

  @Column({ name: 'hours' })
  hours: number
}
