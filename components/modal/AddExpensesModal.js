import { useContext, useState } from "react";
import Modal from "../Modal";
import { expenseContext } from "@/lib/store/expense-context";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
function AddExpensesModal({ isOpenExpenses, setIsOpenExpenses }) {
  const { expenses, addExpenseItem, addCategory } = useContext(expenseContext);
  const [expenseAmount, setExpenseAmount] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const titleRef = useRef();
  const colorRef = useRef();
  const addCategoryHandler = async () => {
    const title = titleRef.current.value;
    const color = colorRef.current.value;
    try {
      await addCategory({ title, color, total: 0 });
      setShowAddExpense(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const addExpenseItemHandler = async () => {
    const expense = expenses.find((e) => e.id === selectedCategory);
    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);
      setExpenseAmount("");
      setSelectedCategory(null);
      setIsOpenExpenses();
    } catch (error) {
      console.log(error.message);
    }
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
          <div>
            <h3 className="text-2xl capitalize">Select Expense Category</h3>
            <button
              className="text-lime-400"
              onClick={() => {
                setShowAddExpense(true);
              }}
            >
              + New Category
            </button>
          </div>
          {showAddExpense && (
            <div className="flex items-center justify-between">
              <input type="text" placeholder="Enter Title" ref={titleRef} />
              <input type="color" className="w-24 h-10" ref={colorRef} />
              <button
                className="btn btn-primary-outline"
                onClick={addCategoryHandler}
              >
                Create
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowAddExpense(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}

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
                  />
                  <h4 className="capitalize">{expense.title}</h4>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button className="btn btn-primary" onClick={addExpenseItemHandler}>
            Add Expenses
          </button>
        </div>
      )}
    </Modal>
  );
}
export default AddExpensesModal;
