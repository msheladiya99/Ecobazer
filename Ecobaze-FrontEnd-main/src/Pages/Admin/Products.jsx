import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  fetchAllProduct,
  deleteProduct,
  updateProduct,
} from "../../Redux/Slices/productSlices";
import { fetchAllCategory } from "../../Redux/Slices/categorySlices";
import { toast } from "react-toastify";
import { BsPlusLg, BsTrash, BsPencilSquare, BsXCircle } from "react-icons/bs";

const Products = () => {
  const dispatch = useDispatch();
  
  const { products, isAdded, isUpdated, isDeleted, isLoading, isError } = useSelector(
    (state) => state.products
  );
  const { categories } = useSelector((state) => state.categories);

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    dispatch(fetchAllProduct());
    dispatch(fetchAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (isAdded) {
      toast.success("Product Added Successfully");
      resetForm();
    }
    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      dispatch(fetchAllProduct());
    }
    if (isUpdated) {
      toast.success("Product Updated Successfully");
      resetForm();
      dispatch(fetchAllProduct());
    }
    if (isError) {
      toast.error(isError.error || "An error occurred");
    }
  }, [isAdded, isDeleted, isUpdated, isError, dispatch]);

  const resetForm = () => {
    setData({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
    });
    setImageFile(null);
    setPreview("");
    setIsFormOpen(false);
    setIsUpdateMode(false);
    setSelectedProductId("");
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdateMode) {
      dispatch(updateProduct({ data, imageFile, productId: selectedProductId }));
    } else {
      if (!imageFile) return toast.error("Please upload an image");
      dispatch(addProduct({ data, imageFile }));
    }
  };

  const handleEdit = (product) => {
    setData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
    setPreview(product.image);
    setSelectedProductId(product._id);
    setIsUpdateMode(true);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="p-6 font-Poppins">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg font-semibold"
          >
            <BsPlusLg /> Add New Product
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-10 transition-all animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-700">
              {isUpdateMode ? "Edit Product" : "New Product Details"}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-red-500 transition-all text-2xl">
              <BsXCircle />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 h-64 flex flex-col items-center justify-center relative overflow-hidden group">
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="h-full w-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <label className="bg-white text-gray-800 px-4 py-2 rounded-lg cursor-pointer font-bold">Change Image</label>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-400">
                    <p className="mb-2">Drag & drop or click to upload</p>
                    <p className="text-xs">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required={!isUpdateMode}
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Fresh Organic Apples"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition-all outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition-all outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Stock Inventory</label>
                  <input
                    type="number"
                    name="stock"
                    value={data.stock}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Category</label>
                <select
                  name="category"
                  value={data.category}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition-all outline-none appearance-none"
                  required
                >
                  <option value="">Select a Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Description</label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition-all outline-none resize-none"
                  placeholder="Detailed product description..."
                  required
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : isUpdateMode ? "Update Product" : "Publish Product"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Product List Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="py-4 px-6 font-bold text-gray-700">Product</th>
              <th className="py-4 px-6 font-bold text-gray-700 text-center">Category</th>
              <th className="py-4 px-6 font-bold text-gray-700 text-center">Price</th>
              <th className="py-4 px-6 font-bold text-gray-700 text-center">Stock</th>
              <th className="py-4 px-6 font-bold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50/50 transition-all">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                    <div>
                        <p className="font-bold text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[200px]">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-center font-bold text-gray-700">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`font-medium ${product.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-3 text-xl">
                    <button onClick={() => handleEdit(product)} className="text-blue-500 hover:text-blue-700 transition-colors" title="Edit">
                      <BsPencilSquare />
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700 transition-colors" title="Delete">
                      <BsTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
            <div className="py-20 text-center text-gray-400">
                <p>No products found. Start by adding one!</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Products;
