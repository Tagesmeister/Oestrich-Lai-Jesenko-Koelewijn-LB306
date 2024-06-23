using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScrumMasterAPI.Migrations
{
    /// <inheritdoc />
    public partial class IchhasseJavascriptupdateSprintundaddSprintBackLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoleIDs",
                table: "Sprints",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.CreateTable(
                name: "sprintBackLogs",
                columns: table => new
                {
                    SprintBackLogID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sprintBackLogs", x => x.SprintBackLogID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "sprintBackLogs");

            migrationBuilder.DropColumn(
                name: "RoleIDs",
                table: "Sprints");
        }
    }
}
