using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using to_do_list_api.Validators;

namespace to_do_list_api.Entities;

public class Todo
{
    [Key]
    public Guid Id { get; set; }
    [Required(ErrorMessage = "{0} can't be empty or null")]
    [StringLength(500, MinimumLength = 1, ErrorMessage = "{0} should be between {2} and {1} characters long")]
    public string? Name { get; set; }
    public string? Description { get; set; }
    [DeadlineValidator]
    [DataType(DataType.Date)]
    [Column(TypeName = "Date")]
    public DateTime Deadline { get; set; }
    public byte Priority { get; set; }

    public void CreateId() => Id = Guid.NewGuid();
}