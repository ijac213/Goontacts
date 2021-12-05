using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Goontacts.WebApp.Models
{
    public class ContactPageResults
    {
        public List<ContactItem> ContactItemList { get; set; }
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public int RecCount { get; set; }
    }
}
