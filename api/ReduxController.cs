using System.Linq;
using System.Threading;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AuAuth.Api
 {
    [Route("api/[controller]")]
    public class ReduxController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get(int value)
        {

            Thread.Sleep(5000);
            // return new JsonResult("Test");
            return new JsonResult(new {value = value * 2, isSuccess = true});
        }
    }
 }
 
