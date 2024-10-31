export default function ShippingRates() {
  // Mock data - replace with real data later
  const rates = [
    {
      service: "USPS Priority Mail",
      estimate: "1-3 Business Days",
      rates: [
        { weight: "1-8 oz", price: 4.5 },
        { weight: "9-32 oz", price: 8.25 },
        { weight: "2-10 lbs", price: 15.75 },
      ],
    },
    {
      service: "USPS First Class",
      estimate: "2-5 Business Days",
      rates: [
        { weight: "1-4 oz", price: 3.5 },
        { weight: "5-8 oz", price: 4.25 },
        { weight: "9-13 oz", price: 5.5 },
      ],
    },
    {
      service: "UPS Ground",
      estimate: "1-5 Business Days",
      rates: [
        { weight: "1-16 oz", price: 7.5 },
        { weight: "17-32 oz", price: 9.75 },
        { weight: "2-5 lbs", price: 12.99 },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {rates.map((carrier, index) => (
        <div
          key={carrier.service}
          className={`p-4 ${index !== rates.length - 1 ? "border-b" : ""}`}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{carrier.service}</h3>
              <p className="text-sm text-gray-500">{carrier.estimate}</p>
            </div>
          </div>

          <div className="mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500">
                  <th className="text-left font-medium">Weight</th>
                  <th className="text-right font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {carrier.rates.map((rate) => (
                  <tr key={rate.weight} className="border-t">
                    <td className="py-2">{rate.weight}</td>
                    <td className="py-2 text-right">
                      ${rate.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="p-4 bg-gray-50 rounded-b-lg">
        <p className="text-sm text-gray-600">
          * Rates are estimates and may vary based on destination and package
          dimensions. Actual rates will be calculated at checkout.
        </p>
      </div>
    </div>
  );
}
