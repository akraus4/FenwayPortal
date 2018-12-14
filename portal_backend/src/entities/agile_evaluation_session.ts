import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'agile_evaluation_session' })
export class AgileEvaluationSession {
  @PrimaryGeneratedColumn('uuid', { name: 'agile_evaluation_session_id' })
  agileSessionId: string

  @Column('varchar', { name: 'agile_session_evaluation_name' })
  agileSessionName: string

  @Column('date', { name: 'agile_session_evaluation_start_date' })
  agileSessionStartDate: Date

}
