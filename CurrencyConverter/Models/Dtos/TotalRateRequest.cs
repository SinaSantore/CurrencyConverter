using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CurrencyConverter.Models.Dtos
{
    public class TotalRateRequest
    {
        public int Input { get; set; } 
        public string CurrencyFromId { get; set; }
    }
}