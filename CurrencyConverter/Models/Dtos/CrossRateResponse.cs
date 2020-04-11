using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CurrencyConverter.Models.Dtos
{
    public class CrossRateResponse
    {
        public string Date { get; set; }
        public double InputValue { get; set; }
        public double Rate { get; set; }
        public double ConvertedValue { get; set; }
        public string CurrencyFrom { get; set; }
        public string CurrencyFromId { get; set; }
        public string CurrencyTo { get; set; }
    }
}