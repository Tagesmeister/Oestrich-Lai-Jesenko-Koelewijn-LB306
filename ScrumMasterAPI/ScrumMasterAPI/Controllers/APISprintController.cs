using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScrumMasterAPI.Models;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SprintController : ControllerBase
{
    private readonly SCRUMDB _context;
    public SprintController(SCRUMDB context)
    {
        _context = context;
    }

    [HttpPost("CreateSprint")]
    public IActionResult CreateSprint([FromBody] Sprint sprint)
    {
        if (sprint == null)
        {
            return BadRequest("Sprint data is null");
        }
        _context.Sprints.Add(sprint);
        _context.SaveChanges();

        return Ok(sprint);
    }

    [HttpPut("UpdateSprint/{id}")]
    public IActionResult UpdateSprint(int id, [FromBody] Sprint sprintUpdate)
    {
        if (sprintUpdate == null || id != sprintUpdate.SprintID)
        {
            return BadRequest("Sprint data invalid");
        }

        var existingSprint = _context.Sprints.FirstOrDefault(x => x.SprintID == id);
        if (existingSprint == null)
        {
            return NotFound($"Sprint with ID {id} not found.");
        }
        existingSprint.StartDate = sprintUpdate.StartDate;
        existingSprint.EndDate = sprintUpdate.EndDate;
        existingSprint.ProjectID = sprintUpdate.ProjectID;

        _context.Sprints.Update(existingSprint);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpGet("GetSprint/{id}")]
    public IActionResult GetSprint(int id)
    {
        var sprint = _context.Sprints.FirstOrDefault(s => s.SprintID == id);

        if (sprint == null)
        {
            return NotFound($"Sprint with ID {id} not found");
        }

        return Ok(sprint);
    }
}
