using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UsedBookWebStore.Migrations
{
    /// <inheritdoc />
    public partial class AddPrivacySettingsToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ShowEmail",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ShowFullName",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ShowPhoneNumber",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShowEmail",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ShowFullName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ShowPhoneNumber",
                table: "AspNetUsers");
        }
    }
}
