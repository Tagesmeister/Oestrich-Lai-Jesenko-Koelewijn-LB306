namespace ScrumMasterAPI.Models
{
    public class Sprint
    {
        private int _sprintID;
        private string _startDate;
        private string _endDate;
        private string _project;
        private List<int> _taskIDs;
        public List<int> _roleIDs;

        public int SprintID
        {
            get { return _sprintID; }
            set { _sprintID = value; }
        }

        public string StartDate
        {
            get { return _startDate; }
            set { _startDate = value; }
        }

        public string EndDate
        {
            get { return _endDate; }
            set { _endDate = value; }
        }

        public string Project
        {
            get { return _project; }
            set { _project = value; }
        }

        public List<int> TaskIDs
        {
            get { return _taskIDs; }
            set { _taskIDs = value; }
        }
        public List<int> RoleIDs
        {
            get { return _roleIDs; }
            set { _roleIDs = value; }
        }

    }
}
