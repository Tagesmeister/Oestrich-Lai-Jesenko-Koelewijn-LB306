using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Scrum_Manager_API.Models;
using SQLitePCL;
using Microsoft.EntityFrameworkCore;
using Task = Scrum_Manager_API.Models.Task;

namespace Scrum_Manager_API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class APIController : ControllerBase
{
    public Project project = new Project();
    public Role role = new Role();
    public Sprint Sprint = new Sprint();
    public Task task = new Task();

    private readonly SCRUMDB _context;
    public APIController(SCRUMDB context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateProject([FromBody] Project project)
    {
        if (project == null)
        {
            return BadRequest("Project data is null");
        }
        _context.Projects.Add(project);
        _context.SaveChanges();

        return Ok(project);
    }
    [HttpPut("{id}")]
    public IActionResult UpdateProject(int id, [FromBody] Project projectUpdate)
    {
        if (projectUpdate == null || id != projectUpdate.ProjectID)
        {
            return BadRequest("Project data invalid");
        }

        var existingProject = _context.Projects.FirstOrDefault(x => x.ProjectID == id);
        if (existingProject == null)
        {
            return NotFound($"Project with ID {id} not found.");
        }
        existingProject.ProjectName = projectUpdate.ProjectName;
        existingProject.Description = projectUpdate.Description;
        existingProject.RoleIDs = projectUpdate.RoleIDs;

        _context.Projects.Update(existingProject);
        _context.SaveChanges();

        return NoContent();

   
    }
    [HttpGet("{id}")]
    public IActionResult GetProject(int projectID)
    {
        var project = _context.Projects.FirstOrDefault(s => s.ProjectID == projectID);

        if (project == null)
        {
            return NotFound($"Project with ID {projectID} not found");
        }

        return Ok(project);
    }

    [HttpPost]
    public IActionResult CreateRole(Role role)
    {
        if (role == null)
        {
            return BadRequest("role data is null");
        }
        _context.Roles.Add(role);
        _context.SaveChanges();

        return Ok(role);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateRole(int roleID, [FromBody] Role roleUpdate)
    {
       if(roleUpdate == null || roleID != roleUpdate.RoleID)
       {
            return BadRequest("Role data is invalid");
       }
       var existingRole = _context.Roles.FirstOrDefault(s => s.RoleID == roleID);
       if (existingRole == null)
       {
            return NotFound($"Role with ID {roleID} not found.");
       }
       existingRole.RoleName = roleUpdate.RoleName;
       existingRole.ProjectID = roleUpdate.ProjectID;

       _context.Roles.Update(existingRole);
        _context.SaveChanges();

        return NoContent();
    }
    [HttpDelete("{id}")]
    public IActionResult DeleteRole(int roleID)
    {
        var roleToDelete = _context.Roles.FirstOrDefault(r => r.RoleID == roleID);
        if (roleToDelete == null)
        {
            return NotFound("Role not found.");
        }

        _context.Roles.Remove(roleToDelete);
        _context.SaveChanges();

        return Ok($"Role with ID {roleID} deleted.");
    }

    public IActionResult GetRole(int roleID)
    {
        var Role = _context.Roles.FirstOrDefault(s => s.RoleID == roleID);

        if (role == null)
        {
            return NotFound($"Role with ID {roleID} not found");
        }

        return Ok(role);
    }

    [HttpPost]
    public IActionResult CreateSprint(Sprint sprint)
    {
        if (sprint == null)
        {
            return BadRequest("sprint data is null");
        }
        _context.Sprints.Add(sprint);
        _context.SaveChanges();

        return Ok(sprint);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateSprint(int id, [FromBody] Sprint sprintUpdate)
    {
        if (sprintUpdate == null || id != sprintUpdate.SprintID)
        {
            return BadRequest("Project data invalid");
        }

        var existingProject = _context.Sprints.FirstOrDefault(x => x.SprintID == id);
        if (existingProject == null)
        {
            return NotFound($"Project with ID {id} not found.");
        }
        existingProject.StartDate = sprintUpdate.StartDate;
        existingProject.EndDate = sprintUpdate.EndDate;
        existingProject.ProjectID = sprintUpdate.ProjectID;

        _context.Sprints.Update(existingProject);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpGet("{id}")]
    public IActionResult GetSprint(int sprintID)
    {
        var project = _context.Projects.FirstOrDefault(s => s.ProjectID == sprintID);

        if (project == null)
        {
            return NotFound($"Project with ID {sprintID} not found");
        }

        return Ok(project);
    }

    [HttpPost]
    public IActionResult CreateTask(Task task)
    {
        if (task == null)
        {
            return BadRequest("Task data is null");
        }
        _context.Tasks.Add(task);
        _context.SaveChanges();

        return Ok(task);
    }
    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id,[FromBody]Task taskUpdate)
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
        _context.Tasks.Update(existingTask);
        _context.SaveChanges();

        return NoContent();
    }
    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int taskID)
    {
       var taskToDelete = _context.Tasks.FirstOrDefault(x =>x.TaskID == taskID);
       if (taskToDelete == null)
       {
            return NotFound("Task not found.");
       }
       _context.Tasks.Remove(taskToDelete);
       _context.SaveChanges();

        return Ok($"Task with ID {taskID} deleted.");
    }
    [HttpGet("{id}")]
    public IActionResult GetTask(int taskID)
    {
        var task = _context.Tasks.FirstOrDefault(x => x.TaskID == taskID);

        if (task == null)
        {
            return NotFound($"Task with ID {taskID} not found");
        }
        return Ok(task);
    }
}