using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Weather.Persistence.Models;

namespace Weather.Persistence.Services
{
    public interface ICityService
    {
        Task<City> GetLastAccessedCityAsync();

        Task UpdateLastAccessedCityAsync(City city);
    }
}
