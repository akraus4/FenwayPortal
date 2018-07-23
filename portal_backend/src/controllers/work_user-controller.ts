import { WorkUserRepo } from '../repositories/work_user-repository'
import { WorkUser } from '../entities/work_user'
import { Request, Response } from 'express'

export let getAllWorkUsers = async (req: Request, res: Response) => {
  let wUserRepo: WorkUserRepo = new WorkUserRepo()

  console.log('Received getAllWorkUsers ==> GET')

  wUserRepo.getAllWorkUsers().then((result: any) => {
    console.log('Result : ' + JSON.stringify(result))
    res.send(result)
  })
}
