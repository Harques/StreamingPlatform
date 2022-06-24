using BitirmeTezi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BitirmeTezi.Repositories
{
    public interface IAppRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        bool SaveAll();
        List<Stream> getAllStreams();
        Task<Stream> startStream(Stream stream);
        void endStream(int id);
        Task<User> findUserById(int id);
        Stream findStreamById(int id);
        User findUserByUsername(string username);
        Stream findStreamByStreamKey(string streamKey);
    }
}
