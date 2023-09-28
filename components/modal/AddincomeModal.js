import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "@/components/Modal";
import { useContext, useRef } from "react";

import { currencyFormatter } from "@/lib/utils";
import { expenseContext } from "@/lib/store/expense-context";
function AddIncomeModal({ isOpenIncome, setIsOpenIncome }) {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(expenseContext);
  //handler function
  console.log(income);
  const addIncomeHandler = async (e) => {
    e.preventDefault();
    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };
    try {
      await addIncomeItem(newIncome);
      amountRef.current.value = "";
      descriptionRef.current.value = "";
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteIncomeEntryHandle = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal show={isOpenIncome} onClose={setIsOpenIncome}>
      <form className="input-group " onSubmit={addIncomeHandler}>
        <div className="input-group">
          <label htmlFor="amount">Income Amount</label>
          <input
            type="number"
            name="amount"
            ref={amountRef}
            min={0.01}
            step={0.01}
            placeholder="Enter income amount"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="amount">Description</label>
          <input
            type="text"
            name="description"
            ref={descriptionRef}
            placeholder="Enter income description"
            required
          />
        </div>
        <button className="btn  btn-primary " type="submit">
          Add Entry
        </button>
      </form>
      <div className={"flex flex-col gap-4 "}>
        <h2>Income History</h2>
        <hr />
        {income.map((i) => (
          <div className="flex justify-between items-center " key={i.id}>
            <div>
              <p className="font-semibold">{i.description}</p>
              {/* <small>{i.createdAt.toISOString()}</small> */}
            </div>
            <p className={"flex items-center gap-2"}>
              {currencyFormatter(i.amount)}
              <button
                onClick={() => {
                  deleteIncomeEntryHandle(i.id);
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
}

export default AddIncomeModal;
