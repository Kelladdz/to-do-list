using System.ComponentModel.DataAnnotations;

namespace to_do_list_api.Validators
{
    public class DeadlineValidatorAttribute : ValidationAttribute
    {
        public DateTime MinimumDate { get; set; } = DateTime.UtcNow;
        public string DefaultErrorMessage { get; set; } = "Deadline should be in future or today";


        public DeadlineValidatorAttribute() { }

        public DeadlineValidatorAttribute(DateTime minimumDate)
        {
            MinimumDate = minimumDate;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value != null)
            {
                DateTime date = (DateTime)value;
                if (date < MinimumDate)
                {
                    return new ValidationResult(string.Format(ErrorMessage ?? DefaultErrorMessage));
                }
                else
                {
                    return ValidationResult.Success;
                }
            }
            return null;
        }
    }
}
