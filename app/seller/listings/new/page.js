import ListingForm from "@/components/seller/listings/ListingForm";

export default function NewListingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Listing</h1>
        <p className="text-gray-600 mt-2">
          Fill out the form below to create a new listing.
        </p>
      </div>

      <div className="max-w-4xl">
        <ListingForm />
      </div>
    </div>
  );
}
