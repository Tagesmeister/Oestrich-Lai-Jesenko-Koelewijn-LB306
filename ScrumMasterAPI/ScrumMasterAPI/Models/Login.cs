namespace ScrumMasterAPI.Models
{
    public class Login
    {
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
    }
}
