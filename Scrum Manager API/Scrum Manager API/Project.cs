namespace Scrum_Manager_API;

public class Project
{
    private int _projectID;
    private string _projectName;
    private string _description;
    private List<int> _roleIDs;

    public int ProjectID
    {
        get { return _projectID; }
        set { _projectID = value; }
    }

    public string ProjectName
    {
        get { return _projectName; }
        set { _projectName = value; }
    }

    public string Description
    {
        get { return _description; }
        set { _description = value; }
    }

    public List<int> RoleIDs
    {
        get { return _roleIDs; }
        set { _roleIDs = value; }
    }
}