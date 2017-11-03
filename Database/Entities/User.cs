using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AuAuth.Database.Entities
{
    public enum UserRightEnum
    {
        User = 1,
        Admin = 2,
        SuperAdmin = 3
    }
    public class User : IdentityUser
    {
        public UserRightEnum UserRight { get; set; }
    }
}
