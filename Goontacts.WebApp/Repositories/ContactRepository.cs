using Goontacts.WebApp.Data;
using Goontacts.WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Goontacts.WebApp.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private IContactData _contactData;

        public List<ContactItem> GetContactList()
        {
            List<ContactItem> resp = _contactData.GetContactList();
            return resp;
        }

        public ContactRepository(IContactData contactData)
        {
            _contactData = contactData;
        }
    }
}
