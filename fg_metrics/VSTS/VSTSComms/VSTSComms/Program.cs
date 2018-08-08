using System;
using VSTSComms;

namespace VSTSComms
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("File export starting.");
            ////export vsts
            //VSTSExport work = new VSTSExport();
            //work.ProcessTeams();

            Console.WriteLine("File export complete.");
            //import json into database
            VSTSComms.Import.Importer importer = new Import.Importer();
            importer.Run();

            Console.ReadLine();
        }
    }
}
