using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using to_do_list_api.Entities;
using to_do_list_api.Persistance;

namespace to_do_list_api.Controllers;

[ApiController]
[Route("API")]
public class TasksController : ControllerBase
{
    private readonly ToDoListDbContext _dbContext;

    public TasksController(ToDoListDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    [HttpGet("tasks")]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTasks()
    {
        var tasks = await _dbContext.Todos.OrderBy(task => task.Priority).ToListAsync();
        return Ok(tasks);
    }

    [HttpPost("tasks")]
    public async Task<ActionResult<Todo>> PostTask(Todo task)
    {        
        task.CreateId();
        _dbContext.Todos.Add(task);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction("GetTasks",task);
    }

    [HttpPut("{Id}")]
    public async Task<ActionResult<Todo>> PutCity(Guid Id, Todo task)
    {    
        var existingTask = await _dbContext.Todos.FindAsync(Id);

        if(existingTask == null)
        {
            return NotFound();
        }

        existingTask.Name = task.Name;
        existingTask.Priority = task.Priority;
        existingTask.Description = task.Description;
        existingTask.Deadline = task.Deadline;


        try
        {
            await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_dbContext.Todos.Where(task => task.Id == Id).ToList().Any())
            {
                return NotFound();
            }
            else throw;
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(Guid id)
    {
        var task = await _dbContext.Todos.FindAsync(id);
        if (task == null)
        {
            return NotFound();
        }
        _dbContext.Todos.Remove(task);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("tasks")]
    public async Task<IActionResult> DeleteAll()
    {
        var allTasks = await _dbContext.Todos.ToListAsync();
        foreach (var task in allTasks)
        {
            _dbContext.Todos.Remove(task);

        }
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }
}