using System.ComponentModel.DataAnnotations;

namespace Marine.Model.Entity
{
    public class UserManager
    {        
        [Key]
        public Guid BrokerID { get; set; }= Guid.NewGuid();
        public String? Username { get; set; }
        public String? UserEmail { get; set; }
        public String? Password { get; set; }


    }
}
