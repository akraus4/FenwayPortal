import { WorkTeamRepo } from "../repositories/work-team-repository";
import { Request, Response } from "express";

export let getAllWorkTeams = async (req: Request, res: Response) => {
  let wTeamRepo: WorkTeamRepo = new WorkTeamRepo();

  console.log("Received getAllWorkTeams ==> GET");

  wTeamRepo.getAllWorkTeams().then((result: any) => {
      console.log("Result : " + JSON.stringify(result));
      res.send(result);
  });
};
