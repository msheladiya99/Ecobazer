import { BsStarFill } from "react-icons/bs";

const Reviews = () => {
  // Mock data for illustration
  const mockReviews = [
    { id: 1, user: "John Doe", product: "Organic Apple", rating: 5, comment: "Amazing quality, very fresh!", date: "2024-02-20" },
    { id: 2, user: "Jane Smith", product: "Fresh Spinach", rating: 4, comment: "Good, but some leaves were bruised.", date: "2024-02-19" },
    { id: 3, user: "Michael Ross", product: "Organic Carrot", rating: 5, comment: "Best carrots I've ever had.", date: "2024-02-18" },
  ];

  return (
    <div className="p-8 font-Poppins">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Reviews</h1>
        <p className="text-gray-500 mt-1">Manage and respond to customer feedback.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="py-4 px-6 font-bold text-gray-700">Customer</th>
              <th className="py-4 px-6 font-bold text-gray-700">Product</th>
              <th className="py-4 px-6 font-bold text-gray-700 text-center">Rating</th>
              <th className="py-4 px-6 font-bold text-gray-700">Comment</th>
              <th className="py-4 px-6 font-bold text-gray-700 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockReviews.map((review) => (
              <tr key={review.id} className="hover:bg-gray-50/50 transition-all">
                <td className="py-4 px-6 font-bold text-gray-800">{review.user}</td>
                <td className="py-4 px-6 text-gray-600 font-medium">{review.product}</td>
                <td className="py-4 px-6">
                  <div className="flex justify-center gap-1 text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => <BsStarFill key={i} />)}
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-500 text-sm max-w-xs italic">
                  &quot;{review.comment}&quot;
                </td>
                <td className="py-4 px-6 text-right text-sm text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {mockReviews.length === 0 && (
            <div className="py-20 text-center text-gray-400 font-Poppins">
                <p>No reviews yet.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
