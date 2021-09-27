using Goontacts.WebApp.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Goontacts.WebApp.Data
{
    public class ContactData : IContactData
    {
        private string ConnString;

        public List<ContactItem> GetContactList()
        {
            List<ContactItem> resp = new List<ContactItem>();
            using (SqlConnection conn = new SqlConnection(ConnString))
            {
                using (SqlCommand cmd = new SqlCommand("sp_ContactList", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        ContactItem ci = Mapper(reader);
                        resp.Add(ci);
                    }
                    conn.Close();
                }
            }
            return resp;
        }

        private ContactItem Mapper(SqlDataReader reader)
        {
            ContactItem ci = new ContactItem();
            ci.Id = reader.GetInt32("Id");
            ci.Name = reader.GetString("Name");
            ci.Email = reader.GetString("Email");
            ci.PhoneNumber = reader.GetString("PhoneNumber");
            return ci;
        }

        public ContactData(string connString)
        {
            ConnString = connString;
        }
    }
}
