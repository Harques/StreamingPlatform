using BitirmeTezi.Data;
using BitirmeTezi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public List<Stream> getAllStreams()
        {
            return context.Streams.ToList();
        }

        public async Task<Stream> startStream(Stream stream)
        {
            context.Streams.Add(stream);
            context.SaveChanges();
            return stream;
        }

        public void endStream(int id)
        {
            var stream = context.Streams.FirstOrDefault(s => s.Id == id);
            context.Streams.Remove(stream);            
        }

        public async Task<User> findUserById(int id)
        {
            return context.Users.FirstOrDefault(u => u.Id == id);
        }

        public Stream findStreamById(int id)
        {
            return context.Streams.FirstOrDefault(s => s.Id == id);
        }

        public User findUserByUsername(string username)
        {
            return context.Users.FirstOrDefault(u => u.Username == username);
        }

        public Stream findStreamByStreamKey(string streamKey)
        {
            return context.Streams.FirstOrDefault(s => s.URL.Contains(streamKey));
        }
    }
}
