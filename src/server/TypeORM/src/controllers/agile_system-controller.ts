import { AgileSystemRepo } from "../repositories/agile_system-repository";
import { AgileSystem } from "../entities/agile_system";
import { Request, Response } from "express";

export let getAllAgileSystems = async (req: Request, res: Response) => {
    console.log("Received getAllAgileSystems ==> GET");

    AgileSystemRepo.getAllAgileSystems().then((result: any) => {
        console.log("Result : " + JSON.stringify(result));
        res.send(result);
    });
};

export let getAllWorkTeams = async (req: Request, res: Response) => {

  console.log("Received getAllWorkTeams ==> GET");

  AgileSystemRepo.getAllWorkTeams().then((result: any) => {
      console.log("Result : " + JSON.stringify(result));
      res.send(result);
  });
};

export let getAllSprintsBySystem = async (req: Request, res: Response) => {
  var systemId = req.params.systemId;
    console.log("Received getAllWorkTeams ==> GET");
  
    AgileSystemRepo.getAllSprintsBySystem(systemId).then((result: any) => {
        console.log("Result : " + JSON.stringify(result));
        res.send(result);
    });
  };
