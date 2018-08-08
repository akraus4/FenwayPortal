using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace VSTSComms.Utilities
{
    public static class Miscellaneous
    {
        public static string GetFileContents(string fileName)
        {
            // This text is added only once to the file.
            if (File.Exists(fileName))
            {
                return File.ReadAllText(fileName);
            }
            else
                return string.Empty;
        }
    }

    
}
