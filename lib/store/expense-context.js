"use client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { db } from "../firebase";
export const expenseContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
});
export default function ExpenseContextProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const addIncomeItem = async (newIncome) => {
    const collectionRef = collection(db, "income");
    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });
      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (e) {
      console.log(e.message);
    }
  };
  const removeIncomeItem = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    try {
      await deleteDoc(docRef);
      //updatestate
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  const value = { income, expenses, addIncomeItem, removeIncomeItem };
  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");

      const docSnap = await getDocs(collectionRef);

      const data = docSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          //   createdAt: new Date(doc.createdAt.toMillis()),
        };
      });

      setIncome(data);
    };
    const getExpensesData = async () => {
      const collectionRef = collection(db, "expenses");
      const docSnap = await getDocs(collectionRef);
      const data = docSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
    };
    getExpensesData();
    getIncomeData();
  }, []);

  return (
    <expenseContext.Provider value={value}>{children}</expenseContext.Provider>
  );
}
