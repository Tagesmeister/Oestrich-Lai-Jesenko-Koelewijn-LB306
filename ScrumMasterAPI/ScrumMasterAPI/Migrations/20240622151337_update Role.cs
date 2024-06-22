using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScrumMasterAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectID",
                table: "Roles");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Roles",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Roles");

            migrationBuilder.AddColumn<int>(
                name: "ProjectID",
                table: "Roles",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
