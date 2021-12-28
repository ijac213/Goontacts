using Goontacts.WebApp.Models;
using System.Collections.Generic;

namespace Goontacts.WebApp.Data
{
    public interface IContactData
    {
        ContactPageResults GetContactList(int pageSize, int pageNo);
        int SaveContactInfo(ContactAddEditRequest req);
        ContactAddEditRequest GetContactById(int id);
        void UpdateContactInfo(ContactAddEditRequest req);
    }
}