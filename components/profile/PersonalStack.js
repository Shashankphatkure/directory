import Image from "next/image";

export default function PersonalStack({ username }) {
  // Mock data - replace with real data later
  const stackItems = [
    {
      id: 1,
      title: "1889-CC Morgan Silver Dollar",
      description: "Rare key date Morgan dollar in MS-63 condition",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356", // Silver coin
      acquired: "2023-01-15",
      specifications: {
        metal: "Silver",
        weight: "26.73g",
        purity: ".900",
        grade: "MS-63",
      },
    },
    {
      id: 2,
      title: "1oz Gold Buffalo",
      description: "Brilliant uncirculated condition",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d", // Gold coin
      acquired: "2023-02-20",
      specifications: {
        metal: "Gold",
        weight: "31.1g",
        purity: ".9999",
        grade: "BU",
      },
    },
    // Add more mock items...
  ];

  return (
    <div className="space-y-6">
      {stackItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 relative aspect-square">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(item.specifications).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-sm text-gray-500 capitalize">
                      {key}:{" "}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-500">
                Added to stack: {new Date(item.acquired).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
