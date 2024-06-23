using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScrumMasterAPI.Migrations
{
    /// <inheritdoc />
    public partial class updatesprint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectID",
                table: "Sprints");

            migrationBuilder.AddColumn<string>(
                name: "Project",
                table: "Sprints",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Project",
                table: "Sprints");

            migrationBuilder.AddColumn<int>(
                name: "ProjectID",
                table: "Sprints",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
