using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Scrum_Manager_API.Models;

namespace Scrum_Manager_API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    public static Login user = new();
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("register")]
    public ActionResult<Login> Register(LoginDTO request)
    {
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);


        user.Username = request.UserName;
        user.PasswordHash = passwordHash;

        return Ok(user);
    }

    [HttpPost("login")]
    public ActionResult<Login> Login(LoginDTO request)
    {
        if (user.Username != request.UserName || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return BadRequest("Credentials are false. Please Try Again.");
        }

        var token = CreateToken(user);

        return Ok(token);
    }

    private string CreateToken(Login user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.Username)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddDays(1), signingCredentials: creds);

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
}