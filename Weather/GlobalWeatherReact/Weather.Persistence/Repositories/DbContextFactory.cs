using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using Weather.Persistence.Config;
using Weather.Persistence.Models;

namespace Weather.Persistence.Repositories
{
    public class DbContextFactory : IDbContextFactory, IDisposable
    {
        /// <summary>
        /// Create Db context with connection string
        /// </summary>
        /// <param name="settings"></param>
        public DbContextFactory(IOptions<DbContextSettings> settings)
        {
            var options = new DbContextOptionsBuilder<WeatherDbContext>().UseSqlServer
                            (settings.Value.DbConnectionString).Options;
            DbContext = new WeatherDbContext(options);
        }

        ~DbContextFactory()
        {
            Dispose();
        }

        public WeatherDbContext DbContext { get; private set; }


        public void Dispose()
        {
            DbContext?.Dispose();
        }
    }
}
