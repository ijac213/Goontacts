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

        public ContactPageResults GetContactList(int pageSize, int pageNo)
        {
            ContactPageResults rslt = new ContactPageResults();
            List<ContactItem> resp = new List<ContactItem>();
            using (SqlConnection conn = new SqlConnection(ConnString))
            {
                using (SqlCommand cmd = new SqlCommand("sp_ContactList", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@pageCnt", pageSize);
                    cmd.Parameters.AddWithValue("@pageNum", pageNo);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    int recordSet = 0;
                    do
                    {
                        while (reader.Read())
                        {
                            switch (recordSet)
                            {
                                case 0:
                                    ContactItem ci = Mapper(reader);
                                    resp.Add(ci);
                                    break;
                                case 1:
                                    rslt.RecCount = reader.GetInt32(0);
                                    break;
                                default:
                                    break;
                            }
                            
                        }
                        rslt.ContactItemList = resp;
                        rslt.PageSize = pageSize;
                        rslt.PageNo = pageNo;
                        recordSet++;
                    } while (reader.NextResult());
                   
                    conn.Close();
                }
            }
            return rslt;
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

        public int SaveContactInfo(ContactAddRequest req)
        {
            int result = 0;
            using (SqlConnection conn = new SqlConnection(ConnString))
            {
                using(SqlCommand cmd = new SqlCommand("sp_SaveContactInfo", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlParameter p = new SqlParameter("@Id", SqlDbType.Int);
                    p.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(p);
                    cmd.Parameters.AddWithValue("@FirstName", req.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", req.LastName);
                    cmd.Parameters.AddWithValue("@Email", req.Email);
                    cmd.Parameters.AddWithValue("@EmailLabel", req.EmailLabel);
                    cmd.Parameters.AddWithValue("@Phone", req.Phone);
                    cmd.Parameters.AddWithValue("@PhoneLabel", req.PhoneLabel);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    result = (int)cmd.Parameters["@Id"].Value;
                    conn.Close();
                }
            }
            return result;
        }

        public ContactData(string connString)
        {
            ConnString = connString;
        }
    }
}
