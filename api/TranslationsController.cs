using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AuAuth.Api
 {
    [Route("api/[controller]")]
    public class TranslationsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get(string language)
        {
            string lng = ConvertLanguage(language);

            var rm = new ResourceManager(typeof(AuAuth.resources.Resource));

            var culture = new CultureInfo(lng);
            var resourceSet = rm.GetResourceSet(culture, true, true);

            var resourceDictionary = resourceSet.Cast<DictionaryEntry>()
                                .ToDictionary(r => r.Key.ToString(),
                                              r => r.Value.ToString());

            return new JsonResult(resourceDictionary);
        }

        private string ConvertLanguage(string language)
        {
            switch (language)
            {
                case "en":
                    return "en-US";
                case "fr":
                    return "fr-FR";
                default:
                    return "en-US";
            }
        }
    }
 }
 
