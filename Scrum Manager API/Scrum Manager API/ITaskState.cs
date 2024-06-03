namespace Scrum_Manager_API;

public interface ITaskState
{
    void AssignTask();
    void StartTask();
    void TestTask();
    void CompleteTask();
}