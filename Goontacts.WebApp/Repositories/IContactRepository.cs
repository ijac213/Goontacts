using Goontacts.WebApp.Models;
using System.Collections.Generic;

namespace Goontacts.WebApp.Repositories
{
    public interface IContactRepository
    {
        ContactPageResults GetContactList(int pageSize, int pageNo);
        int SaveContactInfo(ContactAddEditRequest req);
        ContactAddEditRequest GetContactById(int id);
        void UpdateContactInfo(ContactAddEditRequest req);
    }
}