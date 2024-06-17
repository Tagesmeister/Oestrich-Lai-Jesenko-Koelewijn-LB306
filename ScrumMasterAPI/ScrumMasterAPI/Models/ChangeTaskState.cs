using System.Collections.Generic;
using System.Reflection.Emit;

namespace ScrumMasterAPI.Models
{

    public class ChangeTaskState : TaskState
    {
        public ChangeTaskState(Task task) : base(task) { }

        public override string ChangeState(string newState, string currentState)
        {
            if (newState == "Task assigned")
            {
                return newState;
            }
            else if (currentState == "Task assigned" && newState == "Task started")
            {
                return newState;
            }
            else if (currentState == "Task started" && newState == "Testing task")
            {
                return newState;
            }
            else if (currentState == "Testing Task" && newState == "Task complete")
            {
                return newState;
            }
            else
            {
                return null;
            }

        }

        public override void AssignTask()
        {
            _task.CurrentState = "Task assigned";

        }

        public override void StartTask()
        {

            _task.CurrentState = "Task started";
        }

        public override void TestTask()
        {

            _task.CurrentState = "Testing task";
        }

        public override void CompleteTask()
        {
            _task.CurrentState = "Task complete";
        }
    }
}
