import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { AgileSprint } from '../entities/agile_sprint'
@Entity({ name: 'agile_story' })
export class AgileStory {
  @PrimaryGeneratedColumn('uuid', { name: 'agile_story_id' })
  agile_story_id: string

  @Column('varchar', { name: 'agile_story_name' })
  agile_story_name: string

  // @Column()
  // agile_sprint_id: string;

  @ManyToOne(type => AgileSprint)
  @JoinColumn({ name: 'agile_sprint_id' })
  agile_sprint: AgileSprint

  @Column('varchar', { name: 'story_description' })
  story_description: string

  @Column('varchar', { name: 'story_type' })
  story_type: string

  @Column('varchar', { name: 'story_status' })
  story_status: string

  @Column('varchar', { name: 'story_points' })
  story_points: string
}
