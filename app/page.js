"use client";
import { currencyFormatter } from "@/lib/utils";
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Home() {
  const DUMMY_CATEGORY = [
    { id: 1, title: "Party", color: "#000", amount: "10000" },
    {
      id: 2,
      title: "Party",
      color: "#000",
      amount: "10000",
    },
    { id: 3, title: "Party", color: "#000", amount: "10000" },
    {
      id: 4,
      title: "Party",
      color: "#000",
      amount: "10000",
    },
    { id: 5, title: "Party", color: "#000", amount: "10000" },
    {
      id: 6,
      title: "Party",
      color: "#000",
      amount: "10000",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal show={isOpen} onClose={setIsOpen}></Modal>
      <main className="container max-w-2xl px-6 py-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold"> {currencyFormatter(10000)}</h2>
        </section>
        <setion className="flex items-center gap-2 py-3">
          <button
            className="btn  btn-primary"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            +Expenses
          </button>
          <button
            className="btn  btn-primary-outline"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            +Income
          </button>
        </setion>
        <section className="py-6">
          <h3 className="text-2xl"> My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_CATEGORY.map((expense) => (
              <ExpenseCategoryItem
                key={expense.id}
                color={expense.color}
                title={expense.title}
                amount={expense.amount}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
