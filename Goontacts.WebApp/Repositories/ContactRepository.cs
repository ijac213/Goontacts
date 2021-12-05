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

        public ContactPageResults GetContactList(int pageSize, int pageNo)
        {
            ContactPageResults resp = _contactData.GetContactList(pageSize, pageNo);
            return resp;
        }

        public int SaveContactInfo(ContactAddRequest req)
        {
            int id = _contactData.SaveContactInfo(req);
            return id;
        }

        public ContactRepository(IContactData contactData)
        {
            _contactData = contactData;
        }
    }
}
