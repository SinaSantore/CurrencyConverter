using CurrencyConverter.Models.Dtos;
using CurrencyConverter.riksbanken;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Nager.Date;

namespace CurrencyConverter.Services
{
    public class CurrencyService
    {
        private readonly List<string> Currencies = new List<string> { "SEK", "USD", "EUR" };
        private static readonly Lazy<CurrencyService> lazy = new Lazy<CurrencyService>();
        public static CurrencyService Instance => lazy.Value;
        private readonly SweaWebServicePortTypeClient soapClient;

        public CurrencyService()
        {
            soapClient = new SweaWebServicePortTypeClient();
        }
        public List<SelectListItem> GetCurrencies()
        {
            var currencies = soapClient.getAllCrossNames(LanguageType.sv);

            return currencies?
                .Where(x => Currencies.Contains(x.seriesname))
                .Select(item => new SelectListItem { Text = item.seriesname, Value = item.seriesid })
                .ToList();
        }

        public double GetCrossRate(CrossRateRequest input)
        {
            var request = CreateCrossRateRequest(input.CurrencyFromId, input.CurrencyToId, input.Date);
            var result = soapClient.getCrossRates(request);

            var rate = GetRateFromResult(result, input.CurrencyFromId, input.CurrencyToId);

            return rate;
        }

        public double GetTotalValue(TotalRateRequest[] convertedValues, string convertToId)
        {
            double total = 0;
            foreach(var value in convertedValues)
            {
                if (value.CurrencyFromId == convertToId)
                {
                    total += value.Input;
                    continue;
                }

                var date = GetClosestValidDate();

                var request = CreateCrossRateRequest(value.CurrencyFromId, convertToId, date);
                var result = soapClient.getCrossRates(request);

                if (result.groups == null)
                {
                    return -1;
                }

                var rate = GetRateFromResult(result, value.CurrencyFromId, convertToId);
                total += rate == -1 ? 0 : rate * value.Input;
            }

            return Math.Round(total, 2);          
        }

        private DateTime GetClosestValidDate()
        {
            var date = DateTime.Today;
            var countryCode = CountryCode.SE;

            //Traverse 14 days backwards to find valid non-weekend/holiday date
            for (int i = 0; i < 14; i++)
            {
                if (DateSystem.IsPublicHoliday(date, countryCode) || DateSystem.IsWeekend(date, countryCode))
                {
                    date = date.AddDays(-1);
                } else
                {
                    return date;
                }
            }

            return DateTime.MinValue;
        }

        private double GetRateFromResult(CrossResult result, string CurrencyFromId, string CurrencyToId)
        {
            var crossResultSeries = result.groups?
                .SelectMany(x => x.series)
                .Where(x => x.seriesid1 == CurrencyFromId && x.seriesid2 == CurrencyToId);

            var rate = crossResultSeries?
                .SelectMany(x => x.resultrows)
                .Select(i => i.value)
                .FirstOrDefault();

            return rate.HasValue ? rate.Value : -1;
        }

        private CrossRequestParameters CreateCrossRateRequest(string CurrencyFromId, string CurrencyToId, DateTime Date)
        {
            var request = new CrossRequestParameters
            {
                aggregateMethod = AggregateMethodType.D,
                crossPair = new CurrencyCrossPair[] { new CurrencyCrossPair { seriesid1 = CurrencyFromId, seriesid2 = CurrencyToId } },
                datefrom = Date,
                dateto = Date,
                languageid = LanguageType.sv
            };

            return request;
        }
    }
}