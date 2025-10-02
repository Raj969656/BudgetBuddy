import React, { useState } from "react";
import { createExpense } from "../../services/ExpenseService";
import { toast } from "react-toastify";
import { Button, Label, TextInput, Textarea, Select, ToggleSwitch } from "flowbite-react";
import { MdOutlineCurrencyRupee, MdTitle, MdDescription, MdPayment } from "react-icons/md";
import { motion } from "framer-motion";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rs: 0,
    paymentMethod: "Cash",
    hidden: false,
  });

  const previewAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(formData.rs || 0));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Expense Submitted:", formData);

    // server call..

    try {
      const payload = { ...formData, rs: Number(formData.rs) };
      const responseData = await createExpense(payload);

      toast.success("Expense created successfully...");
      setFormData({
        title: "",
        description: "",
        rs: 0,
        paymentMethod: "Cash",
        hidden: false,
      });
    } catch (error) {
      toast.error(error.message || "Error in creating expense");
    }

    // alert("Expense Added ✅");
  };

  return (
    <motion.div initial={{ y: 6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="max-w-2xl mx-auto mt-2 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-0 shadow-md overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
      {/* Accent and glow */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-emerald-400 to-sky-500" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-gradient-to-br from-emerald-400/20 via-indigo-400/10 to-transparent blur-2xl"
        />
      </div>

      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-100">Add Expense</h2>
            <p className="text-sm text-gray-500 dark:text-neutral-400">
              Record a new transaction with details and payment method.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-emerald-600 bg-emerald-50 ring-1 ring-inset ring-emerald-200 px-3 py-1 rounded-md text-sm dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800">
            <MdOutlineCurrencyRupee className="h-4 w-4" />
            <span>{previewAmount}</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div className="md:col-span-1">
            <Label htmlFor="title" className="text-gray-700 dark:text-neutral-200">Title</Label>
            <TextInput
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter expense title"
              icon={MdTitle}
              required
              shadow
            />
          </div>

          {/* Amount */}
          <div className="md:col-span-1">
            <Label htmlFor="rs" className="text-gray-700 dark:text-neutral-200">Amount (₹)</Label>
            <TextInput
              id="rs"
              type="number"
              name="rs"
              value={formData.rs}
              onChange={handleChange}
              placeholder="0"
              icon={MdOutlineCurrencyRupee}
              min={0}
              step="1"
              shadow
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-neutral-400">
              You will spend: <span className="font-semibold">{previewAmount}</span>
            </p>
          </div>

          {/* Payment Method */}
          <div className="md:col-span-1">
            <Label htmlFor="paymentMethod" className="text-gray-700 dark:text-neutral-200">Payment Method</Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <MdPayment className="h-5 w-5" />
              </div>
              <Select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="pl-9"
                required
              >
                <option value="Cash">💵 Cash</option>
                <option value="Card">💳 Card</option>
                <option value="UPI">📱 UPI</option>
                <option value="Bank Transfer">🏦 Bank Transfer</option>
              </Select>
            </div>
          </div>

          {/* Hidden Toggle */}
          <div className="md:col-span-1 flex items-end">
            <div className="w-full">
              <Label className="text-gray-700 dark:text-neutral-200">Visibility</Label>
              <div className="mt-1 flex items-center justify-between rounded-xl border border-gray-200 dark:border-neutral-800 px-3 py-2">
                <span className="text-sm text-gray-600 dark:text-neutral-300">Mark as Hidden</span>
                <ToggleSwitch
                  checked={formData.hidden}
                  label=""
                  onChange={(val) => setFormData((prev) => ({ ...prev, hidden: val }))}
                />
              </div>
            </div>
          </div>

          {/* Description - full width */}
          <div className="md:col-span-2">
            <Label htmlFor="description" className="text-gray-700 dark:text-neutral-200">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Add a short note about this expense"
              required
              shadow
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button type="submit" color="blue" className="shadow-md">
            Save Expense
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddExpense;
