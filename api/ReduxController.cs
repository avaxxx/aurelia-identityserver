using System.Linq;
using System.Threading;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AuAuth.Api
 {
    [ApiVersion( "1.0" )]
    [Route( "api/v{version:apiVersion}/[controller]" )]
    public class ReduxController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get(int value)
        {

            // Thread.Sleep(5000);
            // return new JsonResult("Test");
            return new JsonResult(new {value = value * 2, isSuccess = true});
        }
    }
 }
 
