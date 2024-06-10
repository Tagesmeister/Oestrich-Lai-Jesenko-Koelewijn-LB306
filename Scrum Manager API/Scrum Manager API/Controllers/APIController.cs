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

        //public ActionResult GetProject(int projectID)
        {
            // Logic to get project details
        }

        //public ActionResult CreateRole(Role role)
        {
            // Logic to create role
        }

        //public ActionResult UpdateRole(Role role)
        {
            // Logic to update role
        }

        //public ActionResult DeleteRole(int roleID)
        {
            // Logic to delete role
        }

        //public ActionResult GetRole(int roleID)
        {
            // Logic to get role details
        }

        //public ActionResult CreateSprint(Sprint sprint)
        {
            // Logic to create sprint
        }

        //public ActionResult UpdateSprint(Sprint sprint)
        {
            // Logic to update sprint
        }

        //public ActionResult GetSprint(int sprintID)
        {
            // Logic to get sprint details
        }

        //public ActionResult CreateTask(Task task)
        {
            // Logic to create task
        }

        //public ActionResult UpdateTask(Task task)
        {
            // Logic to update task
        }

        //public ActionResult DeleteTask(int taskID)
        {
            // Logic to delete task
        }

        //public ActionResult GetTask(int taskID)
        {
            // Logic to get task details
        }
    }
}