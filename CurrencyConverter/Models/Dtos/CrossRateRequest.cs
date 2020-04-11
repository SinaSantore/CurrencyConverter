using CurrencyConverter.riksbanken;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CurrencyConverter.Models.Dtos
{
    public class CrossRateRequest
    {
        public double InputValue { get; set; }
        public double Rate { get; set; }
        public double ConvertedValue { get; set; }
        public string CurrencyFromId { get; set; }
        public string CurrencyFromName { get; set; }
        public string CurrencyToId { get; set; }
        public string CurrencyToName { get; set; }
        public DateTime Date { get; set; }
    }
}