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

        public IActionResult GetContactList([FromQuery]int pageSize, int pageNo)
        {
            try
            {
                var contactResult = _contactRepository.GetContactList(pageSize, pageNo);
                return Ok(contactResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }       
        } 

        [HttpGet("{id:int}")]
        public IActionResult GetContactById([FromRoute]int id)
        {
            try
            {
                ContactAddEditRequest result = _contactRepository.GetContactById(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost]
        public IActionResult SaveContactInfo([FromBody] ContactAddEditRequest req)
        {
            int id = _contactRepository.SaveContactInfo(req);
            return Ok(req);
        }

        [HttpPut]
        public IActionResult UpdateContactInfo([FromBody] ContactAddEditRequest req)
        {
            try
            {
                _contactRepository.UpdateContactInfo(req);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        public ContactController(IContactRepository contactRepository, ILogger<ContactController> logger)
        {
            _contactRepository = contactRepository;
            this.logger = logger;
        }
    }
}
