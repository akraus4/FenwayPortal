// import { AgileSystemRepo } from '../repositories/agile_system-repository'
import { AgileSystem } from '../entities/agile_system'
import { Request, Response } from 'express'
// import { AgileSystemRepo } from '../repositories/agile_system-repository'
import { getManager } from 'typeorm'
import { doesNotThrow } from 'assert';
/**
 * Represents some Type of the Object.
 */
declare type ObjectType<T> = {
  new (): T;
} | Function

const EntityType = {
  'AgileSystems': AgileSystem
}

export const getAll = async (req: Request, res: Response) => {
  console.log(`Received getAll for ${req.params.entityType} ==> GET`)

  return getAllRecords(EntityType[req.params.entityType]).then((result) => {
    res.send(result)
  }).catch(error => {
    console.log(error)
  })
}

// Repository
// async function getAllRecords<Entity> (entity: ObjectType<Entity> | string, relations: Array<string> = []) {
function getAllRecords <T> (entity: ObjectType<T>, relationships: Array<string> = []) {
  const manager = getManager()
  return manager.find(entity, { relations: relationships })
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
