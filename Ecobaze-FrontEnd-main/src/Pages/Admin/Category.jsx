import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  fetchAllCategory,
  deleteCategory,
  updateCategory,
} from "../../Redux/Slices/categorySlices";
import { toast } from "react-toastify";
import { BsPlusLg, BsTrash, BsPencilSquare, BsXCircle, BsImage } from "react-icons/bs";

const Category = () => {
  const dispatch = useDispatch();
  
  const { categories, isAdded, isUpdated, isDeleted, isLoading } = useSelector(
    (state) => state.categories
  );

  const [categoryData, setCategoryData] = useState({
    name: "",
    image: "",
  });
  const [preview, setPreview] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (isAdded) {
      toast.success("Category Added Successfully");
      resetForm();
      dispatch(fetchAllCategory());
    }
    if (isDeleted) {
      toast.success("Category Deleted Successfully");
      dispatch(fetchAllCategory());
    }
    if (isUpdated) {
      toast.success("Category Updated Successfully");
      resetForm();
      dispatch(fetchAllCategory());
    }
  }, [isAdded, isDeleted, isUpdated, dispatch]);

  const resetForm = () => {
    setCategoryData({ name: "", image: "" });
    setPreview("");
    setIsFormOpen(false);
    setIsUpdateMode(false);
    setSelectedCategoryId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setCategoryData({ ...categoryData, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryData.name) return toast.error("Please enter a category name");
    
    if (isUpdateMode) {
      dispatch(updateCategory({ categoryData, categoryId: selectedCategoryId }));
    } else {
      if (!categoryData.image) return toast.error("Please upload an image");
      dispatch(createCategory(categoryData));
    }
  };

  const handleEdit = (category) => {
    setCategoryData({ name: category.name, image: category.image });
    setPreview(category.image);
    setSelectedCategoryId(category._id);
    setIsUpdateMode(true);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="p-6 font-Poppins">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg font-semibold"
          >
            <BsPlusLg /> Add Category
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-10 transition-all animate-fadeIn max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-700">
              {isUpdateMode ? "Edit Category" : "Create New Category"}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-red-500 transition-all text-2xl">
              <BsXCircle />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 h-48 flex flex-col items-center justify-center relative overflow-hidden group">
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="h-full w-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <label className="bg-white text-gray-800 px-4 py-2 rounded-lg cursor-pointer font-bold">Change Image</label>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-400">
                    <BsImage className="text-4xl mx-auto mb-2 opacity-20" />
                    <p className="text-sm font-medium">Click to upload category image</p>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required={!isUpdateMode}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Category Name</label>
                <input
                  type="text"
                  value={categoryData.name}
                  onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
                  placeholder="e.g. Organic Vegetables"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md disabled:opacity-50"
              >
                {isLoading ? "Processing..." : isUpdateMode ? "Update Category" : "Create Category"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all relative"
          >
            <div className="h-40 overflow-hidden relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-bold text-lg">{cat.name}</p>
              </div>
            </div>
            
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(cat)}
                  className="w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-blue-600 shadow hover:bg-white transition-colors"
                >
                  <BsPencilSquare />
                </button>
                <button 
                  onClick={() => handleDelete(cat._id)}
                  className="w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-red-600 shadow hover:bg-white transition-colors"
                >
                  <BsTrash />
                </button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400">
                <p>No categories found.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Category;
