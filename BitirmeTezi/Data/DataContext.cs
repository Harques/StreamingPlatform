using BitirmeTezi.Models;
using Microsoft.EntityFrameworkCore;

namespace BitirmeTezi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Stream> Streams { get; set; }

    }
}
