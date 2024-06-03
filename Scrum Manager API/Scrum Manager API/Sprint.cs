namespace Scrum_Manager_API;

public class Sprint
{
    private int _sprintID;
    private DateTime _startDate;
    private DateTime _endDate;
    private int _projectID;

    public int SprintID
    {
        get { return _sprintID; }
        set { _sprintID = value; }
    }

    public DateTime StartDate
    {
        get { return _startDate; }
        set { _startDate = value; }
    }

    public DateTime EndDate
    {
        get { return _endDate; }
        set { _endDate = value; }
    }

    public int ProjectID
    {
        get { return _projectID; }
        set { _projectID = value; }
    }
}