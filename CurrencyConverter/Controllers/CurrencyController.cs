using CurrencyConverter.Models.Dtos;
using CurrencyConverter.Services;
using System;
using System.Web.Mvc;

namespace CurrencyConverter.Controllers
{
    public class CurrencyController : Controller
    {
        // GET: Currency
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetCurrencies()
        {
            var currencies = CurrencyService.Instance.GetCurrencies();
            return Json(currencies, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetCrossRate(CrossRateRequest input)
        {
            var crossRate = CurrencyService.Instance.GetCrossRate(input);

            if (crossRate == -1)
            {
                Response.StatusCode = 400;
                return Json("Request could not be processed", JsonRequestBehavior.DenyGet);
            }

            var response = CreateResponse(input.Date, input.InputValue, crossRate, input.CurrencyFromName, input.CurrencyFromId, input.CurrencyToName);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetTotalValue(TotalRateRequest[] convertedValues, string convertToId)
        {
            var totalValue = CurrencyService.Instance.GetTotalValue(convertedValues, convertToId);

            if (totalValue == -1)
            {
                Response.StatusCode = 400;
                return Json("Request could not be processed", JsonRequestBehavior.DenyGet);
            }

            return Json(totalValue, JsonRequestBehavior.AllowGet);
        }

        private CrossRateResponse CreateResponse(DateTime date, double inputValue, double rate, string CurrencyFromName, string CurrencyFromId, string CurrencyToName)
        {
            return new CrossRateResponse
            {
                Date = date.ToShortDateString(),
                InputValue = inputValue,
                Rate = rate,
                ConvertedValue = Math.Round((inputValue * rate), 2),
                CurrencyFrom = CurrencyFromName,
                CurrencyFromId = CurrencyFromId,
                CurrencyTo = CurrencyToName
            };
        }
    }
}