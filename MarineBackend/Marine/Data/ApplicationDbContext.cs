using Marine.Model.Entity;
using Microsoft.EntityFrameworkCore;

namespace Marine.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<UserManager> UserManagers { get; set; }
    }
}
