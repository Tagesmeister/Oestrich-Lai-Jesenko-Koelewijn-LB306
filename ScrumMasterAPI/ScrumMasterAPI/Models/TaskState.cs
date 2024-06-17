namespace ScrumMasterAPI.Models
{
    public abstract class TaskState : ITaskState
    {
        protected Task _task;

        protected TaskState(Task task)
        {
            _task = task;
        }
        public abstract string ChangeState(string newState, string currentState);
        public abstract void AssignTask();
        public abstract void StartTask();
        public abstract void TestTask();
        public abstract void CompleteTask();
    }
}
