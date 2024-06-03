namespace Scrum_Manager_API.Models;

public class Role
{
    private int _roleID;
    private string _roleName;
    private int _projectID;

    public int RoleID
    {
        get { return _roleID; }
        set { _roleID = value; }
    }

    public string RoleName
    {
        get { return _roleName; }
        set { _roleName = value; }
    }

    public int ProjectID
    {
        get { return _projectID; }
        set { _projectID = value; }
    }
}