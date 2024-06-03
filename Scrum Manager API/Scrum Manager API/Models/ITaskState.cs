namespace Scrum_Manager_API.Models;

public interface ITaskState
{
    void AssignTask();
    void StartTask();
    void TestTask();
    void CompleteTask();
}