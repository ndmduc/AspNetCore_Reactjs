using System;
using System.Collections.Generic;
using System.Text;

namespace Weather.Persistence.Config
{
    public class DbContextSettings
    {
        /// <summary>
        /// DbConnectionString from appsettings.json
        /// </summary>
        public string DbConnectionString { get; set; }
    }
}
