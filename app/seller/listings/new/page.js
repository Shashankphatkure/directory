import ListingForm from "@/components/seller/listings/ListingForm";

export default function NewListingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
          Create New Listing
        </h1>
        <p className="text-[#C0C0C0]/80 mt-2">
          Fill out the form below to create a new listing.
        </p>
      </div>

      <div className="max-w-4xl">
        <ListingForm />
      </div>
    </div>
  );
}
