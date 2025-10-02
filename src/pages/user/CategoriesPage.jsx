import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuthContext } from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Edit, Trash2, PlusCircle, LayoutGrid, Tag } from "lucide-react";

// Modal component for adding/editing categories
const CategoryModal = ({ isOpen, onClose, onSave, category = null }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [category]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }
    onSave({ id: category?.id, name, description });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        className="bg-white rounded-lg p-6 w-96 max-w-full m-4 shadow-xl dark:bg-gray-800"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{category ? 'Edit Category' : 'Add New Category'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows="3"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>,
    document.body
  );
};


export default function CategoriesPage() {
    const { user } = useAuthContext();
    const [categories, setCategories] = useState([
      { id: '1', name: 'Food & Drinks', description: 'Groceries, restaurants, coffee.' },
      { id: '2', name: 'Transport', description: 'Fuel, public transport, car maintenance.' },
      { id: '3', name: 'Shopping', description: 'Clothing, electronics, household goods.' },
      { id: '4', name: 'Utilities', description: 'Electricity, water, internet bills.' },
      { id: '5', name: 'Health', description: 'Doctor visits, medicine, gym membership.' },
      { id: '6', name: 'Entertainment', description: 'Movies, games, subscriptions.' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    // This useEffect would typically fetch categories from your backend
    useEffect(() => {
        if (user) {
            // Placeholder: Fetch categories from backend using user.uid
            console.log("Fetching categories for user:", user.uid);
        }
    }, [user]);

    const handleAddCategory = (newCategory) => {
        // Placeholder: Add to backend and update state
        console.log("Adding new category:", newCategory);
        setCategories(prev => [...prev, { ...newCategory, id: Date.now().toString() }]);
        toast.success("Category added successfully!");
    };

    const handleEditCategory = (updatedCategory) => {
        // Placeholder: Update in backend and state
        console.log("Editing category:", updatedCategory);
        setCategories(prev => prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
        toast.success("Category updated successfully!");
    };

    const handleDeleteCategory = (categoryId) => {
        // Placeholder: Delete from backend and update state
        console.log("Deleting category with id:", categoryId);
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
        toast.info("Category deleted.");
    };

    const openModalForAdd = () => {
      setCurrentCategory(null);
      setIsModalOpen(true);
    };

    const openModalForEdit = (category) => {
      setCurrentCategory(category);
      setIsModalOpen(true);
    };

    return (
      <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <LayoutGrid className="w-8 h-8 text-gray-700" />
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Categories</h1>
          </div>
          <button
            onClick={openModalForAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add New</span>
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Manage your expense categories to better organize and analyze your spending.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <Tag className="w-6 h-6 text-indigo-500 mb-2" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => openModalForEdit(category)}
                  className="p-2 rounded-full text-indigo-500 hover:bg-indigo-50 transition-colors"
                  aria-label="Edit category"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        {categories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No categories found.</p>
            <p className="text-sm mt-2">Click "Add New" to create your first category.</p>
          </div>
        )}

        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={currentCategory ? handleEditCategory : handleAddCategory}
          category={currentCategory}
        />
      </div>
    );
}
