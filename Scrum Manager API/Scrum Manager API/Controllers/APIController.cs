using Microsoft.AspNetCore.Mvc;

namespace Scrum_Manager_API.Controllers;

public class APIController
{
    public APIController() { }

    public ActionResult DeleteUser(int userID)
    {
        // Logic to delete user
    }

    public ActionResult UpdateUser(User user)
    {
        // Logic to update user
    }

    public ActionResult CreateProject(Project project)
    {
        // Logic to create project
    }

    public ActionResult UpdateProject(Project project)
    {
        // Logic to update project
    }

    public ActionResult GetProject(int projectID)
    {
        // Logic to get project details
    }

    public ActionResult CreateRole(Role role)
    {
        // Logic to create role
    }

    public ActionResult UpdateRole(Role role)
    {
        // Logic to update role
    }

    public ActionResult DeleteRole(int roleID)
    {
        // Logic to delete role
    }

    public ActionResult GetRole(int roleID)
    {
        // Logic to get role details
    }

    public ActionResult CreateSprint(Sprint sprint)
    {
        // Logic to create sprint
    }

    public ActionResult UpdateSprint(Sprint sprint)
    {
        // Logic to update sprint
    }

    public ActionResult GetSprint(int sprintID)
    {
        // Logic to get sprint details
    }

    public ActionResult CreateTask(Task task)
    {
        // Logic to create task
    }

    public ActionResult UpdateTask(Task task)
    {
        // Logic to update task
    }

    public ActionResult DeleteTask(int taskID)
    {
        // Logic to delete task
    }

    public ActionResult GetTask(int taskID)
    {
        // Logic to get task details
    }
}