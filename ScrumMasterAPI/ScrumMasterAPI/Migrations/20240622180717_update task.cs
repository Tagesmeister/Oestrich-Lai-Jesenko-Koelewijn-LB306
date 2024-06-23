using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScrumMasterAPI.Migrations
{
    /// <inheritdoc />
    public partial class updatetask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssigneeID",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "CurrentState",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "SprintID",
                table: "Tasks");

            migrationBuilder.AddColumn<string>(
                name: "TaskIDs",
                table: "Sprints",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaskIDs",
                table: "Sprints");

            migrationBuilder.AddColumn<int>(
                name: "AssigneeID",
                table: "Tasks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CurrentState",
                table: "Tasks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SprintID",
                table: "Tasks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
