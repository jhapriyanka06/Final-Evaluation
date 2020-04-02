using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class nameschange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "employee",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "employee",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "DOJ",
                table: "employee",
                newName: "doj");

            migrationBuilder.RenameColumn(
                name: "DOB",
                table: "employee",
                newName: "dob");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "employee",
                newName: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name",
                table: "employee",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "employee",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "doj",
                table: "employee",
                newName: "DOJ");

            migrationBuilder.RenameColumn(
                name: "dob",
                table: "employee",
                newName: "DOB");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "employee",
                newName: "Id");
        }
    }
}
