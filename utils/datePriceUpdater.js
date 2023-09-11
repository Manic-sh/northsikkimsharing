export function updateDatePrice(packageItem, selectedDate, packageTid) {

  console.log("🚀 ~ file: datePriceUpdater.js:3 ~ updateDatePrice ~ packageTid:", packageTid);

  const data = packageItem?.data?.pricingPeriods?.value?.data;

  let basePrice = 0;

  if (data?.prices && selectedDate) {
    const matchingPeriod = data.prices.find((period) => {
      return (
        period.packageType?.id === packageTid &&
        isWithinRange(selectedDate, period.startDate, period.endDate)
      );
    });

    if (matchingPeriod) {
      basePrice = matchingPeriod.price;
    } else {
      // Check the package ID to determine which base price to use
      basePrice =
        data?.basePrice?.[packageTid === "4c1a3a64978d4df29a35150965916882" ? "standard" : "luxury"] ||
        0;
    }
  }

  return basePrice;
}

const isWithinRange = (date, start, end) => {
  const selected = date;
  const rangeStart = new Date(start);
  const rangeEnd = new Date(end);
  return selected >= rangeStart && selected <= rangeEnd;
};
