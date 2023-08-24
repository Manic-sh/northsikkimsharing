export const packageData = [
  {
    handle: "2-night-3-days-indian",
    name: "2 Night 3 Days (Indian)",
    basePrice: 2000,
    availableSeats: 10,
    pricingPeriods: [
      {
        startDate: "2023-12-15",
        endDate: "2023-12-25",
        price: 2500,
      },
      {
        startDate: "2024-06-01",
        endDate: "2024-08-31",
        price: 3500,
      },
      // Add more pricing periods as needed
    ],
    offers: [
      {
        id: "spa_treatment",
        name: "20% OFF",
        pricePercent: 20,
      },
      {
        id: "excursion",
        name: "15% OFF",
        pricePercent: 20,
      },
      // Add more add-ons as needed
    ],
  },
  {
    handle: "1-night-2-days-indian",
    name: "1 Night 2 Days (Indian)",
    basePrice: 2500,
    availableSeats: 9,
    pricingPeriods: [
      {
        startDate: "2024-01-15",
        endDate: "2024-02-28",
        price: 3400,
      },
      {
        startDate: "2024-10-01",
        endDate: "2024-12-15",
        price: 3500,
      },
      // Add more pricing periods as needed
    ],
    offers: [
      {
        id: "off-15",
        name: "OFF 15%",
        price: 15,
      },
      {
        id: "off-20",
        name: "OFF 20%",
        price: 20,
      },
      // Add more add-ons as needed
    ],
  },
  // Add more packages as needed
];
