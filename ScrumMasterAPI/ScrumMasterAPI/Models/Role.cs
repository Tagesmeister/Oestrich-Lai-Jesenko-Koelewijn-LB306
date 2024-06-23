namespace ScrumMasterAPI.Models
{
    public class Role
    {
        private int _roleID;
        private string _roleName;
        private string _name;

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

        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }
    }
}
