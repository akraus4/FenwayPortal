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
import { getManager, In } from 'typeorm'
import { AgileEvaluations } from '../entities/agile_evaluations'
import { AgileEvaluationSession } from '../entities/agile_evaluation_session'
import { AgileEvaluationScores } from '../entities/agile_evaluations_scores'
import { AgileStage } from '../entities/agile_stage'

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
  'WorkDailyHours': WorkDailyHours,
  'AgileEvaluations': AgileEvaluations,
  'AgileEvaluationSessions': AgileEvaluationSession,
  'AgileEvaluationScores': AgileEvaluationScores,
  'AgileStages': AgileStage
}

// Controller methods
export const getAll = async (req: Request, res: Response) => {
  console.log(`Received getAll for ${req.params.entityType} with relations ${req.query.relations} with conditions ${req.query.conditions}`)

  return getAllRecords(EntityType[req.params.entityType], req.query.relations, req.query.conditions).then((result) => {
    console.log(`Result ${JSON.stringify(result)}`)
    res.send(result)
  }).catch(error => {
    console.log(`Error: ${error}`)
  })
}

export const get = async (req: Request, res: Response) => {
  console.log(`Received get for ${req.params.entityType} with id ${req.params.id} with relations ${req.query.relations}`)

  return getRecord(EntityType[req.params.entityType], req.params.id, req.query.relations).then((result) => {
    console.log(`Result ${JSON.stringify(result)}`)
    res.send(result)
  }).catch(error => {
    console.log(`Error: ${error}`)
  })
}

export const save = async (req: Request, res: Response) => {
  console.log(`Received save for ${req.params.entityType} of ${JSON.stringify(req.body)}`)

  return saveRecord(EntityType[req.params.entityType], req.body).then((result) => {
    console.log(`Result ${JSON.stringify(result)}`)
    res.send(result)
  }).catch(error => {
    console.log(`Error: ${error}`)
  })
}

export const update = async (req: Request, res: Response) => {
  console.log(`Received update for ${req.params.entityType} with id ${req.params.id} of ${JSON.stringify(req.body)}`)

  return updateRecord(EntityType[req.params.entityType], req.params.id, req.body).then((result) => {
    console.log(`Result ${JSON.stringify(result)}`)
    res.send(result)
  }).catch(error => {
    console.log(`Error: ${error}`)
  })
}

export const remove = async (req: Request, res: Response) => {
  console.log(`Received remove for ${req.params.entityType} with id ${req.params.id}`)

  return removeRecord(EntityType[req.params.entityType], req.params.id).then((result) => {
    console.log(`Result ${JSON.stringify(result)}`)
    res.send(result)
  }).catch(error => {
    console.log(`Error: ${error}`)
  })
}

// Repository
function getAllRecords <T> (entity: ObjectType<T>, relations: string, conditions: string) {
  const manager = getManager()
  let options: any = {}
  if (relations) {
    options.relations = relations.split(',')
  }
  if (conditions) {
    options.where = {}
    let clauses = conditions.split('&')
    for (let x in clauses) {
      let values = clauses[x].split('=')
      options.where[values[0]] = values[1]
      if (values[1].startsWith('[') && values[1].endsWith(']')) {
        // We have an array and need to do an In
        options.where[values[0]] = In(values[1].substr(1, values[1].length - 2).split(','))
      }
    }
  }
  return manager.find(entity, options)
}

function getRecord <T> (entity: ObjectType<T>, id: string, relations: string) {
  const manager = getManager()
  let options: any = {}
  if (relations) {
    options.relations = relations.split(',')
  }
  return manager.findOne(entity, id, options)
}

function saveRecord <T> (entity: ObjectType<T>, attributes: any) {
  return getManager().insert(entity, attributes)
}

function updateRecord <T> (entity: ObjectType<T>, id: string, attributes: any) {
  return getManager().update(entity, id, attributes)
}

function removeRecord <T> (entity: ObjectType<T>, id: string) {
  const manager = getManager()
  let options: any = {}
  return manager.delete(entity, id, options)
}
