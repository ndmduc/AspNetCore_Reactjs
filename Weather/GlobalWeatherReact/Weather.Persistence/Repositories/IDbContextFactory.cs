using System;
using System.Collections.Generic;
using System.Text;
using Weather.Persistence.Models;

namespace Weather.Persistence.Repositories
{
    public interface IDbContextFactory
    {
        WeatherDbContext DbContext { get; }
    }
}
