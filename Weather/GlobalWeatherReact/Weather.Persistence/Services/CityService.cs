using Serilog;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Weather.Persistence.Models;
using Weather.Persistence.Repositories;

namespace Weather.Persistence.Services
{
    public class CityService : ICityService
    {
        private readonly ICityRepository _repository;

        private readonly ILogger _logger;

        public CityService(ICityRepository repository, ILogger logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<City> GetLastAccessedCityAsync()
        {
            var city = await _repository.GetLastAccessedCityAsync();
            return city;
        }

        public async Task UpdateLastAccessedCityAsync(City city)
        {
            city.AccessedDate = DateTimeOffset.UtcNow;
            await _repository.InsertOrUpdateCityAsync(city);
        }
    }
}
