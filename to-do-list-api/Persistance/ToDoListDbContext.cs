using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using to_do_list_api.Entities;

namespace to_do_list_api.Persistance
{
    public class ToDoListDbContext : DbContext
    {
        public ToDoListDbContext(DbContextOptions options) : base(options)
        {
            
        }

        public ToDoListDbContext()
        {
            
        }

        public DbSet<Todo> Todos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
