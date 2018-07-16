import { metricsRepo } from "../repositories/metricsRepository";
import { AgileSystem } from "../entities/agile_system";
import { Request, Response } from "express";

 

export let getAllAgileSystems = async (req: Request, res: Response) => {
    let mRepo: metricsRepo = new metricsRepo();
 
    console.log("Received getAllAgileSystems ==> GET");
 
    mRepo.getAllAgileSystems().then((result: any) => {
        console.log("Result : " + JSON.stringify(result));
        res.send(result);
    });
 
 
};