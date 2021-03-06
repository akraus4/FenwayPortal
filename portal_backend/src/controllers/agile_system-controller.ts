import { AgileSystemRepo } from '../repositories/agile_system-repository'
import { AgileSystem } from '../entities/agile_system'
import { Request, Response } from 'express'

export let getAllAgileSystems = async (req: Request, res: Response) => {
  console.log('Received getAllAgileSystems ==> GET')

  AgileSystemRepo.getAllAgileSystems().then((result: any) => {
    console.log('Result : ' + JSON.stringify(result))
    res.send(result)
  })
}

export let getAgileSystem = async (req: Request, res: Response) => {
  console.log('Received getAgileSystem ==> GET')

  AgileSystemRepo.getAllAgileSystems().then((result: any) => {
    console.log('Result : ' + JSON.stringify(result))
    res.send(result)
  })
}

export let createAgileSystem = async (req: Request, res: Response) => {
  console.log('Received createAgileSystem ==> PUT')
  let system = req.body
  console.log(system)

  AgileSystemRepo.saveSystem(system).then((result: any) => {
    console.log('Result : ' + JSON.stringify(result))
    res.send(result)
  }).catch((error) => {
    console.log(error)
  })
}

export let updateAgileSystem = async (req: Request, res: Response) => {
  console.log('Received updateAgileSystem ==> POST')
  let system = req.body
  console.log(system)
  let systemId = req.params.systemId
  console.log(`Updating System: ${systemId}`)

  AgileSystemRepo.updateSystem(systemId, system).then((result: any) => {
    console.log('Result : ' + JSON.stringify(result))
    res.send(result)
  }).catch((error) => {
    console.log(error)
  })
}

export let deleteAgileSystem = async (req: Request, res: Response) => {
  console.log('Received deleteAgileSystem ==> DELETE')
  let system = req.body
  console.log(system)
  let systemId = req.params.systemId
  console.log(`Updating System: ${systemId}`)

  AgileSystemRepo.updateSystem(systemId, system).then((result: any) => {
    console.log('Result : ' + JSON.stringify(result))
    res.send(result)
  })
}

export let getAllWorkTeams = async (req: Request, res: Response) => {
  console.log('Received getAllWorkTeams ==> GET')

  AgileSystemRepo.getAllWorkTeams().then((result: any) => {
    console.log('Result : ' + JSON.stringify(result))
    res.send(result)
  })
}

export let getAllSprintsBySystem = async (req: Request, res: Response) => {
  let systemId = req.params.systemId
  console.log('Received getAllSprintsBySystem ==> GET')

  AgileSystemRepo.getAllSprintsBySystem(systemId).then((result: any) => {
    console.log('Result : ' + JSON.stringify(result))
    res.send(result)
  })
}

export let getAllStoriesWithUsersBySprint = async (
  req: Request,
  res: Response
) => {
  let sprintId = req.params.sprintId
  console.log('Received getAllStoriesWithUsersBySprints ==> GET')

  AgileSystemRepo.getAllStoriesWithUsersBySprint(sprintId).then(
    (result: any) => {
      console.log('Result : ' + JSON.stringify(result))
      res.send(result)
    }).catch((error) => {
      console.log(error)
    })
}

export let getAllTeamMembersByTeam = async (req: Request, res: Response) => {
  let teamId = req.params.teamId
  console.log('Received getAllWorkTeamMembersByTeam ==> GET')

  AgileSystemRepo.getAllTeamMembersByTeam(teamId).then((result: any) => {
    console.log('Result : ' + JSON.stringify(result))
    res.send(result)
  })
}

export let getAllSystemUsersBySystem = async (req: Request, res: Response) => {
  console.log('Received getAllSystemUsersBySystem ==> GET')
  let systemId = req.params.systemId

  AgileSystemRepo.getAllSystemUsersBySystem(systemId).then((result: any) => {
    console.log('Result : ' + JSON.stringify(result))
    res.send(result)
  })
}
