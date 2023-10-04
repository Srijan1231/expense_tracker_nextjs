"use client";
import { currencyFormatter } from "@/lib/utils";
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";

import { useContext, useEffect, useState } from "react";

import AddIncomeModal from "@/components/modal/AddincomeModal";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { expenseContext } from "@/lib/store/expense-context";
import AddExpensesModal from "@/components/modal/AddExpensesModal";
import { SignIn } from "@/components/SignIn";
import { authContext } from "@/lib/store/auth-context";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function Home() {
  const { user, loading, logout } = useContext(authContext);
  const { expenses, income } = useContext(expenseContext);
  const [balance, setBalance] = useState(0);
  const [isOpenExpenses, setIsOpenExpenses] = useState(false);
  const [isOpenIncome, setIsOpenIncome] = useState(false);
  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);
    setBalance(newBalance);
  }, [expenses, income]);
  if (!user) {
    return <SignIn />;
  }
  return (
    <>
      <AddIncomeModal
        isOpenIncome={isOpenIncome}
        setIsOpenIncome={setIsOpenIncome}
      />
      <AddExpensesModal
        isOpenExpenses={isOpenExpenses}
        setIsOpenExpenses={setIsOpenExpenses}
      />
      <main className="container max-w-2xl px-6 py-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold"> {currencyFormatter(balance)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button
            className="btn  btn-primary"
            onClick={() => {
              setIsOpenExpenses(true);
            }}
          >
            +Expenses
          </button>
          <button
            className="btn  btn-primary-outline"
            onClick={() => {
              setIsOpenIncome(true);
            }}
          >
            +Income
          </button>
        </section>
        <section className="py-6">
          <h3 className="text-2xl"> My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => (
              <ExpenseCategoryItem key={expense.id} expense={expense} />
            ))}
          </div>
        </section>

        <section className="py-6" id="stats">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
