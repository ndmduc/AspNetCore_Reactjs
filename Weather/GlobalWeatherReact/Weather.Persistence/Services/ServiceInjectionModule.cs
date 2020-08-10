using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Weather.Persistence.Services
{
    public static class ServiceInjectionModule
    {
        public static IServiceCollection InjectServices(this IServiceCollection services)
        {
            services.AddTransient<ICityService, CityService>();
            return services;
        }
    }
}
