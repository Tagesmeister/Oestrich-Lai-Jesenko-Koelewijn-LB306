namespace ScrumMasterAPI.Models
{
    public interface ITaskState
    {
        string ChangeState(string newState, string currentState);
        void AssignTask();
        void StartTask();
        void TestTask();
        void CompleteTask();
    }
}
