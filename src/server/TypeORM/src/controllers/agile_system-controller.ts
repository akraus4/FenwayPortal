import { AgileSystemRepo } from "../repositories/agile_system-repository";
import { AgileSystem } from "../entities/agile_system";
import { Request, Response } from "express";

export let getAllAgileSystems = async (req: Request, res: Response) => {
    let aSystemRepo: AgileSystemRepo = new AgileSystemRepo();

    console.log("Received getAllAgileSystems ==> GET");

    aSystemRepo.getAllAgileSystems().then((result: any) => {
        console.log("Result : " + JSON.stringify(result));
        res.send(result);
    });
};

// export let getAllWorkTeams = async (req: Request, res: Response) => {
//   let aSystemRepo: AgileSystemRepo = new AgileSystemRepo();

//   console.log("Received getAllWorkTeams ==> GET");

//   aSystemRepo.getAllWorkTeams().then((result: any) => {
//       console.log("Result : " + JSON.stringify(result));
//       res.send(result);
//   });
// };
