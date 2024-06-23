namespace ScrumMasterAPI.Models
{
    public class SprintBackLog
    {
        private int _sprintBackLogID;
        private string _title;
        private string _description;

        public int SprintBackLogID
        {
            get { return _sprintBackLogID; }
            set { _sprintBackLogID = value;}
        }

        public string Title 
        {
            get { return _title; } 
            set { _title = value; }
        }
        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }
    }
}
