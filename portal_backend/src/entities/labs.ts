import { ManyToMany, JoinTable, Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { WorkTeam } from './work_team'
@Entity({ name: 'lab' })
export class Lab {
  @PrimaryColumn('uuid', { name: 'lab_id' })
  labId: string

  @Column('varchar', { name: 'url' })
  url: string

  @ManyToMany(type => WorkTeam)
    @JoinTable()
    workTeams: WorkTeam[]

  @Column('varchar', { name: 'description' })
  description: string

}
