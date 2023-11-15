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

        public DbSet<Todo> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Todo>().HasData(new Todo()
            {
                Id = new Guid("15E475FD-E760-4B54-9323-CC2844725E14"),
                Name = "English",
                Description = "Studying an irregular verbs",
                Deadline = new DateTime(2023, 11, 19),
                Priority = 3
            });

            modelBuilder.Entity<Todo>().HasData(new Todo()
            {
                Id = new Guid("C0A0E75A-0EA4-48A6-B69F-F1165FEB52F7"),
                Name = "Coding",
                Description = "Implement a backend in my app",
                Deadline = new DateTime(2023, 11, 15),
                Priority = 2
            });

            modelBuilder.Entity<Todo>().HasData(new Todo()
            {
                Id = new Guid("4ABF0282-C3F3-471A-8833-AC78555A47CE"),
                Name = "Spend some time with my girlfriend",
                Description = "Netflix, Games, Walking",
                Deadline = new DateTime(2023, 11, 22),
                Priority = 1
            });
        }
    }
}
