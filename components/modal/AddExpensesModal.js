import { useContext, useState } from "react";
import Modal from "../Modal";
import { expenseContext } from "@/lib/store/expense-context";
import { v4 as uuidv4 } from "uuid";
function AddExpensesModal({ isOpenExpenses, setIsOpenExpenses }) {
  const { expenses } = useContext(expenseContext);
  const [expenseAmount, setExpenseAmount] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const addExpenseItemHandler = () => {
    const expense = expenses.find((e) => e.id === selectedCategory);
    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };
    setExpenseAmount("");
    setSelectedCategory(null);
    setIsOpenExpenses();
  };

  return (
    <Modal show={isOpenExpenses} onClose={setIsOpenExpenses}>
      <div className="input-group">
        <label htmlFor="amount">Expenses Amount</label>
        <input
          type="number"
          name="amount"
          value={expenseAmount}
          min={0.01}
          step={0.01}
          placeholder="Enter Expense amount"
          required
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl capitalize">Select Expense Category</h3>
          {expenses.map((expense) => (
            <button
              key={expense.id}
              onClick={() => {
                setSelectedCategory(expense.id);
              }}
            >
              <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl ">
                <div className="flex items-center gap-2">
                  <div
                    className="w-[25px] h-[25px] rounded-full"
                    style={{
                      boxShadow:
                        expense.id === selectedCategory
                          ? "1px 1px 4px"
                          : "none",
                      backgroundColor: expense.color,
                    }}
                  >
                    <h4>{expense.title}</h4>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button
            className="btn btn-primary"
            onClick={() => {
              addExpenseItemHandler;
            }}
          >
            Add Expenses
          </button>
        </div>
      )}
    </Modal>
  );
}
export default AddExpensesModal;
