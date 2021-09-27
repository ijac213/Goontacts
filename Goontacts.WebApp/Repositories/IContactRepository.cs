using Goontacts.WebApp.Models;
using System.Collections.Generic;

namespace Goontacts.WebApp.Repositories
{
    public interface IContactRepository
    {
        List<ContactItem> GetContactList();
    }
}