import React, { useEffect, useMemo, useState } from "react";
import {Modal, Button, Label, TextInput, Textarea, Select, ModalHeader, ModalBody, ModalFooter} from "flowbite-react";
import { MdOutlineCurrencyRupee, MdPayment, MdTitle, MdDescription } from "react-icons/md";
import { toast } from "react-toastify";
import { updateExpense } from "../../services/ExpenseService";

const paymentOptions = [
  { value: "Cash", label: "💵 Cash" },
  { value: "Card", label: "💳 Card" },
  { value: "UPI", label: "📱 UPI" },
  { value: "Bank Transfer", label: "🏦 Bank Transfer" },
];

export default function UpdateExpenseModal({ open, onClose, expense, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    rs: 0,
    paymentMethod: "Cash",
    hidden: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (expense) {
      setForm({
        title: expense.title || "",
        description: expense.description || "",
        rs: Number(expense.rs || 0),
        paymentMethod: expense.paymentMethod || "Cash",
        hidden: Boolean(expense.hidden),
      });
    }
  }, [expense]);

  const previewAmount = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(form.rs || 0));
  }, [form.rs]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!expense?._id) {
      toast.error("Invalid expense");
      return;
    }
    try {
      setSaving(true);
      const payload = { ...form, rs: Number(form.rs) };
      const updated = await updateExpense(expense._id, payload);
      toast.success("Expense updated successfully");
      onSuccess?.(updated);
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update expense");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={open} onClose={onClose} size="lg" className="backdrop-blur">
      <ModalHeader>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white grid place-items-center ring-1 ring-indigo-400/50">
            ₹
          </div>
          <div>
            <div className="text-base font-semibold">Update Expense</div>
            <div className="text-xs text-gray-500">Make changes and save</div>
          </div>
        </div>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <TextInput
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Expense title"
                icon={MdTitle}
                required
                shadow
              />
            </div>

            {/* Amount */}
            <div>
              <Label htmlFor="rs">Amount (₹)</Label>
              <TextInput
                id="rs"
                name="rs"
                type="number"
                min={0}
                step="1"
                value={form.rs}
                onChange={handleChange}
                placeholder="0"
                icon={MdOutlineCurrencyRupee}
                required
                shadow
              />
              <p className="mt-1 text-[11px] text-gray-500">
                Preview: <span className="font-semibold">{previewAmount}</span>
              </p>
            </div>

            {/* Payment Method */}
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <MdPayment className="h-5 w-5" />
                </div>
                <Select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  className="pl-9"
                  required
                >
                  {paymentOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Hidden */}
            <div className="flex items-end">
              <div className="w-full">
                <Label htmlFor="hidden">Visibility</Label>
                <label
                  htmlFor="hidden"
                  className="mt-1 flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2 dark:border-neutral-800 cursor-pointer select-none"
                >
                  <span className="text-sm text-gray-600">Mark as Hidden</span>
                  <input
                    id="hidden"
                    type="checkbox"
                    className="h-4 w-4 accent-indigo-600 cursor-pointer"
                    checked={Boolean(form.hidden)}
                    onChange={(e) => setForm((p) => ({ ...p, hidden: e.target.checked }))}
                  />
                </label>
              </div>
            </div>

            {/* Description - full width */}
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Add a note about this expense"
                required
                shadow
              />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button color="gray" onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button color="blue" onClick={handleSubmit} isProcessing={saving}>
          Save changes
        </Button>
      </ModalFooter>
    </Modal>
  );
}
