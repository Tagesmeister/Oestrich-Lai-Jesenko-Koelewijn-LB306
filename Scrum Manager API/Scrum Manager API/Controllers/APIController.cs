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
        existingProject.ProjectID = id;
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

    public IActionResult UpdateRole(Role role)
    {
        
    }

    public IActionResult DeleteRole(int roleID)
    {
        // Logic to delete role
    }

    public IActionResult GetRole(int roleID)
    {
        // Logic to get role details
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

    public IActionResult UpdateSprint(Sprint sprint)
    {
        // Logic to update sprint
    }

    public IActionResult GetSprint(int sprintID)
    {
        // Logic to get sprint details
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

    public IActionResult UpdateTask(Task task)
    {
        // Logic to update task
    }

    public IActionResult DeleteTask(int taskID)
    {
        // Logic to delete task
    }

    public IActionResult GetTask(int taskID)
    {
        // Logic to get task details
    }
}