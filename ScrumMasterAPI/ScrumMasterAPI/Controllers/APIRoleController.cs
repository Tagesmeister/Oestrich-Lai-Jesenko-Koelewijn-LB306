using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScrumMasterAPI.Models;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class RoleController : ControllerBase
{
    private readonly SCRUMDB _context;
    public RoleController(SCRUMDB context)
    {
        _context = context;
    }

    [HttpPost("CreateRole")]
    public IActionResult CreateRole([FromBody] Role role)
    {
        if (role == null)
        {
            return BadRequest("Role data is null");
        }
        _context.Roles.Add(role);
        _context.SaveChanges();

        return Ok(role);
    }

    [HttpPut("UpdateRole/{id}")]
    public IActionResult UpdateRole(int id, [FromBody] Role roleUpdate)
    {
        if (roleUpdate == null || id != roleUpdate.RoleID)
        {
            return BadRequest("Role data is invalid");
        }

        var existingRole = _context.Roles.FirstOrDefault(s => s.RoleID == id);
        if (existingRole == null)
        {
            return NotFound($"Role with ID {id} not found.");
        }
        existingRole.RoleName = roleUpdate.RoleName;
        existingRole.ProjectID = roleUpdate.ProjectID;

        _context.Roles.Update(existingRole);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpDelete("DeleteRole/{id}")]
    public IActionResult DeleteRole(int id)
    {
        var roleToDelete = _context.Roles.FirstOrDefault(r => r.RoleID == id);
        if (roleToDelete == null)
        {
            return NotFound("Role not found.");
        }

        _context.Roles.Remove(roleToDelete);
        _context.SaveChanges();

        return Ok($"Role with ID {id} deleted.");
    }

    [HttpGet("GetRole/{id}")]
    public IActionResult GetRole(int id)
    {
        var role = _context.Roles.FirstOrDefault(s => s.RoleID == id);

        if (role == null)
        {
            return NotFound($"Role with ID {id} not found");
        }

        return Ok(role);
    }

    [HttpGet("GetRoles")]
    public IActionResult GetRoles()
    {
        var roles = _context.Roles.ToList();

        if (roles == null || roles.Count == 0)
        {
            return NotFound("No roles found");
        }

        return Ok(roles);
    }
}
