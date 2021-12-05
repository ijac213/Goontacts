using Goontacts.WebApp.Models;
using System.Collections.Generic;

namespace Goontacts.WebApp.Repositories
{
    public interface IContactRepository
    {
        ContactPageResults GetContactList(int pageSize, int pageNo);
        int SaveContactInfo(ContactAddRequest req);
    }
}