using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScrumMasterAPI.Models;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private readonly SCRUMDB _context;
    public ProjectController(SCRUMDB context)
    {
        _context = context;
    }

    [HttpPost("CreateProject")]
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

    [HttpPut("UpdateProject/{id}")]
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

    [HttpGet("GetProject/{id}")]
    public IActionResult GetProject(int id)
    {
        var project = _context.Projects.FirstOrDefault(s => s.ProjectID == id);

        if (project == null)
        {
            return NotFound($"Project with ID {id} not found");
        }

        return Ok(project);
    }

    [HttpDelete("DeleteProject/{id}")]
    public IActionResult DeleteRole(int id)
    {
        var projectDelete = _context.Projects.FirstOrDefault(r => r.ProjectID == id);
        if (projectDelete == null)
        {
            return NotFound("Role not found.");
        }

        _context.Projects.Remove(projectDelete);
        _context.SaveChanges();

        return Ok($"Project with ID {id} deleted.");
    }
}

