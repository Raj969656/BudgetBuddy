import React, { useEffect, useState } from "react";
import { getExpenses } from "../../services/ExpenseService";
import { toast } from "react-toastify";
import { MdInfo, MdTimer, MdSearch } from "react-icons/md";
import ExpenseView from "../../components/user/ExpenseView";
import { Button, TextInput, Datepicker, Label } from "flowbite-react";
function ViewExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    if (searchKeyword.trim() == "") {
      setExpenses([...allExpenses]);
      return;
    }

    if (searchKeyword.trim() != "" && searchKeyword.trim().length > 2) {
      const searchedElements = allExpenses.filter((exp) =>
        exp.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );

      if (searchedElements.length <= 0) {
        return;
      }

      setExpenses(searchedElements);
      return;
    }
  }, [searchKeyword]);

  // function to load data with filters: defaults
  async function loadExpense(minPrice = "", maxPrice = "") {
    try {
      const exp = await getExpenses(minPrice, maxPrice);
      console.log(exp);
      setExpenses(exp);
      setAllExpenses(exp);
    } catch (error) {
      toast.error("Error in loading expenses");
      console.log(error);
    }
  }

  useEffect(() => {
    //loadExpese

    loadExpense();
  }, []);

  const applyFilter = async () => {
    console.log(filters);

    loadExpense(filters.minPrice, filters.maxPrice);

    // load filtered data from server:
  };

  const clearFilter = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
    });

    setSearchKeyword("");

    loadExpense();
  };

  //remove expense:

  const removeExpense = (expenseId) => {
    const newExpenses = expenses.filter((exp) => exp._id != expenseId);
    const newAllExpenses = allExpenses.filter((exp) => exp._id != expenseId);
    setExpenses([...newExpenses]);
    setAllExpenses([...newAllExpenses]);
  };

  // update expense in local state
  const handleExpenseUpdated = (updated) => {
    setExpenses((prev) => prev.map((e) => (e._id === updated._id ? { ...e, ...updated } : e)));
    setAllExpenses((prev) => prev.map((e) => (e._id === updated._id ? { ...e, ...updated } : e)));
  };

  return (
    <div>
      {/* heading */}
      {/* <h1 className="text-3xl text-end mb-3 w-fit font-semibold">
        Expenses : {expenses.length}
      </h1> */}

      {/* search bar */}
      <div className="mb-4">
        <TextInput
          icon={MdSearch}
          sizing="md"
          color="gray"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search expenses by title..."
          shadow
          className="w-full"
        />
      </div>

      {/* END search bar */}

      {/* Filters */}

      <div className="relative z-40 rounded-2xl  border border-gray-200 bg-white/70 backdrop-blur p-4 shadow-sm dark:bg-neutral-900/60 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-neutral-200">Filters</h3>
          <span className="text-xs text-gray-500">{expenses.length} results</span>
        </div>
        <div className="flex gap-3 flex-wrap items-end">
          <div className="flex flex-col">
            <Label htmlFor="minPrice" className="text-gray-600 px-1 text-xs">
              Min price
            </Label>
            <TextInput
              onChange={(e) => {
                setFilters({
                  ...filters,
                  minPrice: e.target.value,
                });
              }}
              value={filters.minPrice}
              id="minPrice"
              sizing="sm"
              placeholder="0"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="maxPrice" className="text-gray-600 px-1 text-xs">
              Max price
            </Label>
            <TextInput
              onChange={(e) => {
                setFilters({
                  ...filters,
                  maxPrice: e.target.value,
                });
              }}
              value={filters.maxPrice}
              id="maxPrice"
              sizing="sm"
              placeholder="1000"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="fromDate" className="text-gray-600 px-1 text-xs">
              From date
            </Label>
            <div className="relative z-50">
              <Datepicker id="fromDate" sizing="sm" placeholder="From date" className="z-50" />
            </div>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="toDate" className="text-gray-600 px-1 text-xs">
              To date
            </Label>
            <div className="relative z-50">
              <Datepicker id="toDate" sizing="sm" placeholder="To date" className="z-50" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className="cursor-pointer flex justify-center gap-1 items-center"
              color={"gray"}
              size="xs"
            >
              <MdTimer /> <span>Today</span>
            </Button>
            <Button
              className="cursor-pointer flex justify-center gap-1 items-center"
              color={"gray"}
              size="xs"
            >
              <MdTimer /> <span>Yesterday</span>
            </Button>
            <Button
              className="cursor-pointer flex justify-center gap-1 items-center"
              color={"gray"}
              size="xs"
            >
              <MdTimer /> <span>Last 7 days</span>
            </Button>
            <Button
              className="cursor-pointer flex justify-center gap-1 items-center"
              color={"gray"}
              size="xs"
            >
              <MdTimer /> <span>This month</span>
            </Button>
          </div>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          <Button
            onClick={applyFilter}
            className="cursor-pointer"
            size="sm"
            color={"green"}
          >
            Apply filter
          </Button>
          <Button
            onClick={clearFilter}
            className="cursor-pointer"
            size="sm"
            color={"red"}
            outline
          >
            Clear
          </Button>
        </div>
      </div>

      {/* END Filters */}
      {expenses.length > 0 && (
        <div className="">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
              {expenses.map((expense, index) => (
                <ExpenseView
                  removeExpense={removeExpense}
                  onUpdateExpense={handleExpenseUpdated}
                  key={index}
                  expense={expense}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {expenses.length <= 0 && (
        <div className="flex flex-col justify-center mt-10 items-center gap-2">
          <MdInfo className="text-red-400" size={38} />
          <h1 className="text-center text-3xl font-semibold">
            No expense available
          </h1>
        </div>
      )}
    </div>
  );
}

export default ViewExpenses;
