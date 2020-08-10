using Serilog;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Weather.Persistence.Models;

namespace Weather.Persistence.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly IDbContextFactory _dbContextFactory;

        protected ILogger Logger;

        public Repository(IDbContextFactory dbContextFactory, ILogger logger)
        {
            _dbContextFactory = dbContextFactory;
            Logger = logger;
        }

        protected WeatherDbContext DbContext => _dbContextFactory?.DbContext;

        public async Task<TEntity> AddEntity(TEntity entity)
        {
            try
            {
                var result = await DbContext.AddAsync<TEntity>(entity);
                await DbContext.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "Unhandled Exception");
                throw;
            }
        }

        public async Task<bool> DeleteEntity(object id)
        {
            var entity = await DbContext.FindAsync<TEntity>(id);
            if (entity != null)
            {
                DbContext.Remove<TEntity>(entity);
                await DbContext.SaveChangesAsync();
            }

            return true;
        }

        public async Task<TEntity> GetEntity(object id)
        {
            var entity = await DbContext.FindAsync<TEntity>(id);
            return entity;
        }

        public async Task<TEntity> UpdateEntity(TEntity entity)
        {
            DbContext.Update<TEntity>(entity);
            await DbContext.SaveChangesAsync();
            return entity;
        }
    }
}
