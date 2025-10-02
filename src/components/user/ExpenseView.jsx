import React, {useState} from "react";
import {BsPencilSquare} from "react-icons/bs";
import {MdDelete} from "react-icons/md";
import {deleteExpense} from "../../services/ExpenseService";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import UpdateExpenseModal from "./UpdateExpenseModal";
import {motion} from "framer-motion";

function ExpenseView({removeExpense, expense, onUpdateExpense}) {
    const formattedDate = new Date(expense.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const formattedAmount = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(expense.rs || 0));

    const method = String(expense.paymentMethod || "Other").toLowerCase();

    const methodStyles = (() => {
        if (method.includes("cash")) {
            return {
                bg: "bg-amber-50 dark:bg-amber-900/20",
                text: "text-amber-700 dark:text-amber-300",
                ring: "ring-amber-200 dark:ring-amber-800",
                icon: "💵",
            };
        }
        if (method.includes("upi")) {
            return {
                bg: "bg-emerald-50 dark:bg-emerald-900/20",
                text: "text-emerald-700 dark:text-emerald-300",
                ring: "ring-emerald-200 dark:ring-emerald-800",
                icon: "📲",
            };
        }
        if (method.includes("card")) {
            return {
                bg: "bg-indigo-50 dark:bg-indigo-900/20",
                text: "text-indigo-700 dark:text-indigo-300",
                ring: "ring-indigo-200 dark:ring-indigo-800",
                icon: "💳",
            };
        }
        if (method.includes("bank") || method.includes("net")) {
            return {
                bg: "bg-sky-50 dark:bg-sky-900/20",
                text: "text-sky-700 dark:text-sky-300",
                ring: "ring-sky-200 dark:ring-sky-800",
                icon: "🏦",
            };
        }
        return {
            bg: "bg-gray-50 dark:bg-neutral-800",
            text: "text-gray-700 dark:text-neutral-300",
            ring: "ring-gray-200 dark:ring-neutral-700",
            icon: "💼",
        };
    })();

    const [openEdit, setOpenEdit] = useState(false);

    async function handleDelete() {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#000",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const data = await deleteExpense(expense._id);
                removeExpense(expense._id);
                toast.success(data.message);
            } catch (error) {
                toast.error("Error in deleting expense!!");
                console.log(error);
            }
        }
    }

    return (
        <motion.div initial={{y: 6, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    whileHover={{y: -6, scale: 1.01}}

                    className="group relative -z-0 w-full overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 dark:bg-neutral-900 dark:border-neutral-800">
            {/* Accent line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-emerald-400 to-sky-500"/>

            {/* Subtle glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-gradient-to-br from-emerald-400/20 via-indigo-400/10 to-transparent blur-2xl"
            />

            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <div
                            className={`h-12 w-12 rounded-xl ring-1 ${methodStyles.ring} ${methodStyles.bg} flex items-center justify-center text-lg`}
                            aria-hidden
                        >
                            <span className="leading-none">{methodStyles.icon}</span>
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-100 truncate">
                                {expense.title}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-neutral-300 line-clamp-2">
                                {expense.description || "No description provided."}
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0">
            <span
                className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-emerald-700 text-sm font-semibold ring-1 ring-inset ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800">
              {formattedAmount}
            </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between text-xs">
          <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${methodStyles.bg} ${methodStyles.text} ring-1 ${methodStyles.ring}`}
          >
            <span className="text-base leading-none">{methodStyles.icon}</span>
            <span className="font-medium capitalize">{expense.paymentMethod || "Other"}</span>
          </span>
                    <span className="text-gray-500 dark:text-neutral-400">{formattedDate}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    type="button"
                    title="Delete expense"
                    aria-label="Delete expense"
                    onClick={handleDelete}
                    className="cursor-pointer p-2 w-8 h-8 rounded-full bg-red-50 text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-100 active:scale-95 transition"
                >
                    <MdDelete size={18}/>
                </button>
                <button
                    type="button"
                    title="Edit expense"
                    aria-label="Edit expense"
                    onClick={() => setOpenEdit(true)}
                    className="cursor-pointer p-2 w-8 h-8 rounded-full bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-200 hover:bg-blue-100 active:scale-95 transition"
                >
                    <BsPencilSquare size={16}/>
                </button>
            </div>

            {/* Update Modal */}
            <UpdateExpenseModal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                expense={expense}
                onSuccess={(updated) => {
                    onUpdateExpense?.(updated);
                    setOpenEdit(false);
                }}
            />
        </motion.div>
    );
}

export default ExpenseView;
