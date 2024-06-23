using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScrumMasterAPI.Models;

namespace ScrumMasterAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class APISprintBackLogController : ControllerBase
    {
        private readonly SCRUMDB _context;
        public APISprintBackLogController(SCRUMDB context)
        {
            _context = context;
        }
        [HttpPost("CreateSprintBackLog")]
        public IActionResult CreateSprintBackLog([FromBody] SprintBackLog sprintBackLog)
        {
            if (sprintBackLog == null)
            {
                return BadRequest("Sprint data is null");
            }
            _context.sprintBackLogs.Add(sprintBackLog);
            _context.SaveChanges();

            return Ok(sprintBackLog);
        }
        [HttpGet("GetSprintBackLogs")]
        public IActionResult GetSprintBackLogs()
        {
            var sprintBackLogs = _context.sprintBackLogs.ToList();

            if (sprintBackLogs == null || sprintBackLogs.Count == 0)
            {
                return NotFound("No sprints found");
            }

            return Ok(sprintBackLogs);
        }
    }
}
