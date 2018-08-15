import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: 'work_team' })
export class WorkTeam {
  @PrimaryGeneratedColumn('uuid', { name: 'work_team_id' })
  workTeamId: string

  @Column('varchar', { name: 'work_team_name' })
  workTeamName: string

  @Column('varchar', { name: 'project_id' })
  projectId: string

  @Column('varchar', { name: 'project_name' })
  projectName: string

  @Column('tinyint', { name: 'active' })
  active: boolean
}
