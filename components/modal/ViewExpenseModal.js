import { currencyFormatter } from "@/lib/utils";
import Modal from "../Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { expenseContext } from "@/lib/store/expense-context";

export const ViewExpenseModal = ({
  showViewExpenses,
  setShowViewExpenses,
  expense,
}) => {
  const { deleteExpenseItem, deleteExpenseCategory } =
    useContext(expenseContext);
  const deleteExpenseItemHandler = async (item) => {
    try {
      const updatedItems = expense.items.filter((i) => i.id !== item.id);
      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount,
      };
      await deleteExpenseItem(updatedExpense, expense.id);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteExpenseHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id);
    } catch (error) {}
  };

  return (
    <Modal show={showViewExpenses} onClose={setShowViewExpenses}>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">{expense.title}</h2>
        <button className="btn btn-danger" onClick={deleteExpenseHandler}>
          Delete
        </button>
      </div>
      <div>
        <h3 className="my-4 text-2xl">Expense History</h3>
        {expense.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <small>
              {item.createdAt.toMillis
                ? new Date(item.createdAt.toMillis()).toISOString()
                : item.createdAt.toISOString()}
            </small>
            <p className="flex items-center gap-2 ">
              {currencyFormatter(item.amount)}
              <button
                onClick={() => {
                  deleteExpenseItemHandler(item);
                }}
              >
                <FaRegTrashAlt />
              </button>
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
};
