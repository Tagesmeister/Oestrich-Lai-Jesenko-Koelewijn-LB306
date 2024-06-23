using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScrumMasterAPI.Models;

[Authorize]

[Route("api/[controller]")]
[ApiController]
public class TaskController : ControllerBase
{
   
    private readonly SCRUMDB _context;
    public TaskController(SCRUMDB context)
    {
        _context = context;
    }

    [HttpPost("CreateTask")]
    public IActionResult CreateTask([FromBody] ScrumMasterAPI.Models.Task task)
    {
        if (task == null)
        {
            return BadRequest("Task data is null");
        }
        _context.Tasks.Add(task);
        _context.SaveChanges();

        return Ok(task);
    }

    [HttpPut("UpdateTask/{id}")]
    public IActionResult UpdateTask(int id, [FromBody] ScrumMasterAPI.Models.Task taskUpdate)
    {
        if (taskUpdate == null || id != taskUpdate.TaskID)
        {
            return BadRequest("Task data is invalid.");
        }

        var existingTask = _context.Tasks.FirstOrDefault(x => x.TaskID == id);
        if (existingTask == null)
        {
            return NotFound($"Task with ID {id} not found.");
        }
        existingTask.Title = taskUpdate.Title;
        existingTask.Description = taskUpdate.Description;

        existingTask.Status = taskUpdate.Status;
       



        _context.Tasks.Update(existingTask);
        _context.SaveChanges();

        return NoContent();
    }
    [HttpPut("UpdateState/{id}")]
    public IActionResult UpdateState(int id, [FromBody] ScrumMasterAPI.Models.Task newState)
    {
        if (newState == null || id != newState.TaskID)
        {
            return BadRequest("Task data is invalid");
        }

        var currentTask = _context.Tasks.FirstOrDefault(x => x.TaskID == id);
        if (currentTask == null)
        {
            return NotFound($"Task with ID {id} not found");
        }

        return NoContent();


    }

    [HttpDelete("DeleteTask/{id}")]
    public IActionResult DeleteTask(int id)
    {
        var taskToDelete = _context.Tasks.FirstOrDefault(x => x.TaskID == id);
        if (taskToDelete == null)
        {
            return NotFound("Task not found.");
        }

        _context.Tasks.Remove(taskToDelete);
        _context.SaveChanges();

        return Ok($"Task with ID {id} deleted.");
    }

    [HttpGet("GetTask/{id}")]
    public IActionResult GetTask(int id)
    {
        var task = _context.Tasks.FirstOrDefault(x => x.TaskID == id);

        if (task == null)
        {
            return NotFound($"Task with ID {id} not found");
        }

        return Ok(task);
    }


    [HttpGet("GetTasks")]
    public IActionResult GetTasks()
    {
        var tasks = _context.Tasks.ToList();

        if (tasks == null || tasks.Count == 0)
        {
            return NotFound("No tasks found");
        }

        return Ok(tasks);
    }
}
