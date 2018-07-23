import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { AgileSystemUser } from '../entities/agile_system_user'
import { AgileStory } from '../entities/agile_story'

@Entity({ name: 'agile_story_agile_system_user' })
export class AgileStoryAgileSystemUser {
  @PrimaryGeneratedColumn('uuid', { name: 'agile_story_agile_system_user_id' })
  agile_story_agile_system_user_id: string

  // @Column()
  // agile_story_id: string;

  @ManyToOne(type => AgileStory)
  @JoinColumn({ name: 'agile_story_id' })
  agile_story: AgileStory

  // @Column()
  // agile_system_user_id: string;

  @ManyToOne(type => AgileSystemUser)
  @JoinColumn({ name: 'agile_system_user_id' })
  agile_system_user: AgileSystemUser

  @Column('varchar', { name: 'agile_system_user_story_points' })
  agile_system_user_story_points: string
}
