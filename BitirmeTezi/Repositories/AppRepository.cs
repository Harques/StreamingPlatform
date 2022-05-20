﻿using BitirmeTezi.Data;

namespace BitirmeTezi.Repositories
{
    public class AppRepository : IAppRepository
    {

        private DataContext context;

        public AppRepository(DataContext context)
        {
            this.context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            context.Update(entity);
        }

        public bool SaveAll()
        {
            return context.SaveChanges() > 0;
        }

        
    }
}