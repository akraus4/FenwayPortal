using System;
using VSTSComms;

namespace VSTSComms
{
    class Program
    {
        enum RunType
        {
            Extract,
            Load,
            Both
        }
        static void Main(string[] args)
        {
            RunType runType = RunType.Both;
            if (args.Length > 0)
            {
                var input = args[0].ToString().ToLower();
                switch (input)
                {
                    case "extract":
                        runType = RunType.Extract;
                        break;
                    case "load":
                        runType = RunType.Load;
                        break;
                    default:
                        break;
                }
            }
            Console.WriteLine($"Run type = {runType.ToString()}.");
            if (runType == RunType.Both || runType == RunType.Extract)
            {
                Console.WriteLine("File extract starting.");
                //export vsts
                VSTSExport work = new VSTSExport();
                work.ProcessTeams();
                Console.WriteLine("File extract complete.");
            }
            if (runType == RunType.Both || runType == RunType.Load)
            {
                Console.WriteLine("File load to database starting.");
                //import json into database
                VSTSComms.Import.Importer importer = new Import.Importer();
                importer.Run();
                Console.WriteLine("File load to database complete.");
            }
            //Console.ReadLine();
        }
    }
}
