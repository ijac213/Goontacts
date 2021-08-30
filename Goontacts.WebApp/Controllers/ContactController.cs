using Goontacts.WebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace Goontacts.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ILogger<ContactController> logger;

        public IActionResult GetContactList()
        {
            var contactList = new List<ContactItem>();
            var ContactItemOne = new ContactItem();
            ContactItemOne.Id = 1;
            ContactItemOne.Name = "Mickey Mouse";
            ContactItemOne.Email = "Mickey@Disney.com";
            ContactItemOne.PhoneNumber = "(213)555-1212";
            contactList.Add(ContactItemOne);

            var ContactItemTwo = new ContactItem();
            ContactItemTwo.Id = 2;
            ContactItemTwo.Name = "Minnie Mouse";
            ContactItemTwo.Email = "Minnie@Disney.com";
            ContactItemTwo.PhoneNumber = "(213)555-1212";
            contactList.Add(ContactItemTwo);

            var ContactItemThree = new ContactItem();
            ContactItemThree.Id = 3;
            ContactItemThree.Name = "Donald Duck";
            ContactItemThree.Email = "Donald@Disney.com";
            ContactItemThree.PhoneNumber = "(323)555-1234";
            contactList.Add(ContactItemThree);

            return Ok(contactList.ToArray());
        } 

        public ContactController(ILogger<ContactController> logger)
        {
            this.logger = logger;
        }
    }
}
