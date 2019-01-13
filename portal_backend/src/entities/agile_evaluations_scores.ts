import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { AgileEvaluations } from '../entities/agile_evaluations'
import { WorkUser } from '../entities/work_user'
@Entity({ name: 'agile_evaluation_scores' })
export class AgileEvaluationScores {
  @PrimaryGeneratedColumn('uuid', { name: 'agile_evaluation_scores_id' })
  agileEvaluationScoresId: string

  @ManyToOne(type => AgileEvaluations)
  @JoinColumn({ name: 'agile_evaluation_id' })
  agileEvaluation: AgileEvaluations

  @ManyToOne(type => WorkUser)
  @JoinColumn({ name: 'appraiser_user_id' })
  appraiserUserId: WorkUser

  @Column('tinyint', { name: 'technical_score' })
  technicalScore: number

  @Column('text', { name: 'technical_comment' })
  technicalComment: string

  @Column('tinyint', { name: 'communication_score' })
  communicationScore: number

  @Column('text', { name: 'communication_comment' })
  communicationComment: string

  @Column('tinyint', { name: 'behavioral_score' })
  behavioralScore: number

  @Column('text', { name: 'behavioral_comment' })
  behavioralComment: string

  @Column('tinyint', { name: 'metric_score' })
  metricScore: number

  @Column('text', { name: 'metric_comment' })
  metricComment: string

  @Column('tinyint', { name: 'total_score' })
  totalScore: number

  @Column('text', { name: 'overall_comment' })
  overallComment: string

  @Column('text', { name: 'additional_comment' })
  additionalComment: string

  @Column('text', { name: 'failure_reason_comment' })
  failureReasonComment: string

  @Column('varchar', { name: 'agile_evaluation_score_date' })
  agileEvaluationScoreDate: Date

  @Column('tinyint', { name: 'passed' })
  passed: boolean

}
