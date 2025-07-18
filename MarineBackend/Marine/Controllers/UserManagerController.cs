using Marine.Data;
using Marine.Model;
using Marine.Model.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Marine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagerController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public UserManagerController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var allUser = dbContext.UserManagers.ToList();
            return Ok(allUser);
        }
   
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginUserDto loginDto)
        {
            // Validate if Email and Password are provided
            if (string.IsNullOrEmpty(loginDto.UserEmail) || string.IsNullOrEmpty(loginDto.Password))
            {
                return BadRequest("Email and Password are required.");
            }

            // Search for the user by email and password
            var user = dbContext.UserManagers
                                .FirstOrDefault(u => u.UserEmail == loginDto.UserEmail && u.Password == loginDto.Password);


            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(user);
        }
        [HttpPost]
        public IActionResult AddUser(AddUserDto adduserdto)
        {
            var userEntity = new UserManager()
            {
                Username = adduserdto.Username,
                UserEmail = adduserdto.UserEmail,
                Password = adduserdto.Password,
            };

            dbContext.UserManagers.Add(userEntity);
            dbContext.SaveChanges();
            return Ok(userEntity);



        }
    }
}
