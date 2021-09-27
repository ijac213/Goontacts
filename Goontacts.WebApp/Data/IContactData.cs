using Goontacts.WebApp.Models;
using System.Collections.Generic;

namespace Goontacts.WebApp.Data
{
    public interface IContactData
    {
        List<ContactItem> GetContactList();
    }
}