using Microsoft.EntityFrameworkCore.Migrations;

namespace BitirmeTezi.Migrations
{
    public partial class StreamsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StreamId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Streams",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    URL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StreamerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Streams", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_StreamId",
                table: "Users",
                column: "StreamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Streams_StreamId",
                table: "Users",
                column: "StreamId",
                principalTable: "Streams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Streams_StreamId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Streams");

            migrationBuilder.DropIndex(
                name: "IX_Users_StreamId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "StreamId",
                table: "Users");
        }
    }
}
