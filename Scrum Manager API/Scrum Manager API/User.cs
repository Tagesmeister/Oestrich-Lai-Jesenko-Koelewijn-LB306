namespace Scrum_Manager_API;

public class User
{
    private string _username;
    private string _password;

    public string Username
    {
        get { return _username; }
        set { _username = value; }
    }

    public string Password
    {
        get { return _password; }
        set { _password = value; }
    }
}