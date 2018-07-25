// import { AgileSystemRepo } from '../repositories/agile_system-repository'
import { AgileSystem } from '../entities/agile_system'
import { WorkTeam } from '../entities/work_team'
import { AgileSprint } from '../entities/agile_sprint'
import { AgileStory } from '../entities/agile_story'
import { AgileStoryAgileSystemUser } from '../entities/agile_story_agile_system_user'
import { AgileSystemUser } from '../entities/agile_system_user'
import { WorkTeamMember } from '../entities/work_team_member'
import { WorkUser } from '../entities/work_user'
import { WorkDailyHours } from '../entities/work_dailyhours'
import { Request, Response } from 'express'
import { getManager } from 'typeorm'

/**
 * Represents some Type of the Object.
 */
declare type ObjectType<T> = {
  new (): T;
} | Function

// Valid EntityTypes
const EntityType = {
  'AgileSystems': AgileSystem,
  'WorkTeams': WorkTeam,
  'AgileSprints': AgileSprint,
  'AgileStories': AgileStory,
  'AgileStoryAgileSystemUsers': AgileStoryAgileSystemUser,
  'AgileSystemUsers': AgileSystemUser,
  'WorkTeamMembers': WorkTeamMember,
  'WorkUsers': WorkUser,
  'WorkDailyHours': WorkDailyHours
}

// Controller methods
export const getAll = async (req: Request, res: Response) => {
  console.log(`Received getAll for ${req.params.entityType} ==> GET`)
let relations = req.query.relations? req.query.relations.split(','):[];
  return getAllRecords(EntityType[req.params.entityType], relations).then((result) => {
    console.log(result) 
    res.send(result)
  }).catch(error => {
    console.log(error)
  })
}

// Repository
// async function getAllRecords<Entity> (entity: ObjectType<Entity> | string, relations: Array<string> = []) {
function getAllRecords <T> (entity: ObjectType<T>, relations: Array<string> = []) {
  const manager = getManager()
  return manager.find(entity, { relations: relations })
}

// export async function createRecord<T> (entity: ObjectType<T>, attributes: Seed<T>, manager?: EntityManager, relations: object = {}): Promise<T> {
//     const m = manager || getManager()
//     const record = m.create(entity, attributes as any)
//     for (let relId of m.connection.getMetadata(entity).relationIds) {
//       relations[relId.relation.propertyName] = attributes[relId.propertyName]
//     }
//     for (let r in relations) {
//       if (relations[r] !== undefined) {
//         if (typeof relations[r] === 'string') {
//           record[r] = { id: relations[r] }
//         } else if (typeof relations[r] === 'object' && 'id' in relations[r]) {
//           record[r] = { id: relations[r].id }
//         }
//       }
//     }
//     const ret = await m.save(record)
//     for (let rel of m.connection.getMetadata(entity).relations) {
//       ret[`__has_${rel.propertyName}__`] = false
//     }
//     return ret
//   }
