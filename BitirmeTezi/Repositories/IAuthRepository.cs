using BitirmeTezi.Models;
using System.Threading.Tasks;

namespace BitirmeTezi.Repositories
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExistsByEmail(string email);
        Task<bool> UserExistsByUsername(string username);
        Task<User> UserByUsername(string username);
        
    }
}
