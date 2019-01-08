import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { AgileStage } from '../entities/agile_stage'
import { AgileEvaluationSession } from '../entities/agile_evaluation_session'
import { WorkUser } from '../entities/work_user'
@Entity({ name: 'agile_evaluations' })
export class AgileEvaluations {
  @PrimaryGeneratedColumn('uuid', { name: 'agile_evaluation_id' })
  agileEvaluationsId: string

  @ManyToOne(type => AgileStage)
  @JoinColumn({ name: 'agile_stage_id' })
  agileStage: AgileStage

  // @ManyToOne(type => AgileEvaluationSession)
  // @JoinColumn({ name: 'agile_evaluation_session_id' })
  // agileEvaluationSession: AgileEvaluationSession

  @ManyToOne(type => WorkUser)
  @JoinColumn({ name: 'presenter_user_id' })
  presenterUserId: WorkUser

  @Column('varchar', { name: 'agile_evaluation_date' })
  agileEvaluationDate: Date

  @Column('tinyint', { name: 'passed', nullable: true })
  passed: boolean

}
