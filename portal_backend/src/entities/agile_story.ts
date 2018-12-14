import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm'
import { AgileSprint } from '../entities/agile_sprint'
import { AgileStoryAgileSystemUser } from '../entities/agile_story_agile_system_user'
@Entity({ name: 'agile_story' })
export class AgileStory {
  @PrimaryGeneratedColumn('uuid', { name: 'agile_story_id' })
  agileStoryId: string

  @Column('varchar', { name: 'agile_story_name' })
  agileStoryName: string

  @ManyToOne(type => AgileSprint)
  @JoinColumn({ name: 'agile_sprint_id' })
  agileSprint: AgileSprint

  @OneToMany(type => AgileStoryAgileSystemUser, agileStoryAgileSystemUser => agileStoryAgileSystemUser.agileStory)
  agileStoryAgileSystemUsers: AgileStoryAgileSystemUser[]

  @Column('varchar', { name: 'story_description' })
  storyDescription: string

  @Column('varchar', { name: 'story_type' })
  storyType: string

  @Column('varchar', { name: 'story_status' })
  storyStatus: string

  @Column('varchar', { name: 'story_points' })
  storyPoints: string
}
