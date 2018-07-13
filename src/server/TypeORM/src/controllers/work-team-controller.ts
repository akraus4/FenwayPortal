import { WorkTeamRepo } from "../repositories/work-team-repository";
import { AgileSystem } from "../entities/agile_system";
import { Request, Response } from "express";



export let getAllWorkTeams = async (req: Request, res: Response) => {
  let aSystemRepo: WorkTeamRepo = new WorkTeamRepo();

  console.log("Received getAllWorkTeams ==> GET");

  aSystemRepo.getAllWorkTeams().then((result: any) => {
      console.log("Result : " + JSON.stringify(result));
      res.send(result);
  });
};
