using Goontacts.WebApp.Models;
using Goontacts.WebApp.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace Goontacts.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactRepository _contactRepository;
        private readonly ILogger<ContactController> logger;

        public IActionResult GetContactList()
        {
            try
            {
                var contactList = _contactRepository.GetContactList();
                return Ok(contactList.ToArray());
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }       
        } 

        [HttpPost]
        public IActionResult SaveContactInfo([FromBody] ContactAddRequest req)
        {
            int id = _contactRepository.SaveContactInfo(req);
            return Ok(req);
        }

        public ContactController(IContactRepository contactRepository, ILogger<ContactController> logger)
        {
            _contactRepository = contactRepository;
            this.logger = logger;
        }
    }
}
