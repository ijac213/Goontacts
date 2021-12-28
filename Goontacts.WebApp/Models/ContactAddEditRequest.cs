using DataAnnotationsExtensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Goontacts.WebApp.Models
{
    public class ContactAddEditRequest
    {
        public int Id { get; set; }

        [Required] 
        [MinLength(2,ErrorMessage = "Minimun length is 2 characters")]
        [MaxLength(25,ErrorMessage ="Maximum length is 25 characters")]
        public string FirstName { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = "Minimun length is 2 characters")]
        [MaxLength(25, ErrorMessage = "Maximum length is 25 characters")]
        public string LastName { get; set; }

        [Required]
        [Email]
        public string Email { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = "Minimun length is 2 characters")]
        public string EmailLabel { get; set; }

        [Required]
        [MinLength(10, ErrorMessage = "Minimun length is 10 numbers")]
        public string Phone { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = "Minimun length is 2 characters")]
        public string PhoneLabel { get; set; }
    }
}
