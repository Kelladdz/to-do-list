using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace to_do_list_api.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deadline = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Priority = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "Deadline", "Description", "Name", "Priority" },
                values: new object[,]
                {
                    { new Guid("15e475fd-e760-4b54-9323-cc2844725e14"), new DateTime(2023, 11, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), "Studying an irregular verbs", "English", (byte)3 },
                    { new Guid("4abf0282-c3f3-471a-8833-ac78555a47ce"), new DateTime(2023, 11, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "Netflix, Games, Walking", "Spend some time with my girlfriend", (byte)1 },
                    { new Guid("c0a0e75a-0ea4-48a6-b69f-f1165feb52f7"), new DateTime(2023, 11, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Implement a backend in my app", "Coding", (byte)2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tasks");
        }
    }
}
