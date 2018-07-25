import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: 'work_team' })
export class WorkTeam {
  @PrimaryGeneratedColumn('uuid', { name: 'work_team_id' })
  work_team_id: string

  @Column('varchar', { name: 'work_team_name' })
  work_team_name: string

  @Column('varchar', { name: 'project_id' })
  project_id: string

  @Column('varchar', { name: 'project_name' })
  project_name: string
}
