import { EmployeeRepo } from "../repositories/employee-repository";
import { EmployeeEntity } from "../entities/employee-entity";
import { Request, Response } from "express";
 
export let getAllEmployees = async (req: Request, res: Response) => {
    let empRepo: EmployeeRepo = new EmployeeRepo();
 
    console.log("Received GetAllEmployees ==> GET");
 
    empRepo.getAllEmployees().then((result: any) => {
        console.log("Result : " + result);
        res.send(result);
    });
 
 
};
 
