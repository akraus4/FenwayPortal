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
  console.log(req.query.relations)

  return getAllRecords(EntityType[req.params.entityType], req.query.relations).then((result) => {
    console.log(result)
    res.send(result)
  }).catch(error => {
    console.log(error)
  })
}

export const get = async (req: Request, res: Response) => {
  console.log(`Received get for ${req.params.entityType} ${req.params.id} ==> GET`)

  return getRecord(EntityType[req.params.entityType], req.params.id, req.query.relations).then((result) => {
    console.log(result)
    res.send(result)
  }).catch(error => {
    console.log(error)
  })
}

export const save = async (req: Request, res: Response) => {
  console.log(`Received save for ${req.params.entityType} ==> PUT`)
  console.log(req.body)

  return saveRecord(EntityType[req.params.entityType], req.body).then((result) => {
    console.log(result)
    res.send(result)
  }).catch(error => {
    console.log(error)
  })
}

export const update = async (req: Request, res: Response) => {
  console.log(`Received update for ${req.params.entityType} ${req.params.id} ==> POST`)
  console.log(req.body)

  return updateRecord(EntityType[req.params.entityType], req.params.id, req.body).then((result) => {
    console.log(result)
    res.send(result)
  }).catch(error => {
    console.log(error)
  })
}

export const remove = async (req: Request, res: Response) => {
  console.log(`Received remove for ${req.params.entityType} ${req.params.id} ==> DELETE`)

  return removeRecord(EntityType[req.params.entityType], req.params.id).then((result) => {
    console.log(result)
    res.send(result)
  }).catch(error => {
    console.log(error)
  })
}

// Repository
function getAllRecords <T> (entity: ObjectType<T>, relations: string) {
  const manager = getManager()
  let options: any = {}
  if (relations) {
    options.relations = relations.split(',')
  }
  console.log(`Relations = ${relations}`)
  return manager.find(entity, options)
}

function getRecord <T> (entity: ObjectType<T>, id: string, relations: string) {
  const manager = getManager()
  let options: any = {}
  if (relations) {
    options.relations = relations.split(',')
  }
  console.log(`Relations = ${relations}`)
  return manager.findOne(entity, id, options)
}

function saveRecord <T> (entity: ObjectType<T>, attributes: any) {
  console.log('Object = ' + JSON.stringify(attributes))

  return getManager().insert(entity, attributes)
}

function updateRecord <T> (entity: ObjectType<T>, id: string, attributes: any) {
  console.log('Object = ' + JSON.stringify(attributes))

  return getManager().update(entity, id, attributes)
}

function removeRecord <T> (entity: ObjectType<T>, id: string) {
  const manager = getManager()
  let options: any = {}
  return manager.delete(entity, id, options)
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
