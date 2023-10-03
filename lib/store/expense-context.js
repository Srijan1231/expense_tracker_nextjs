"use client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { db } from "../firebase";
export const expenseContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  removeIncomeItem: async () => {},
  removeExpenseItem: async () => {},
  deleteExpenseItem: async () => {},
  deleteExpenseCategory: async () => {},
});
export default function ExpenseContextProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const addCategory = async (category) => {
    try {
      const collectionRef = collection(db, "expense");
      const docSnap = await addDoc(collectionRef, {
        ...category,
        items: [],
      });
      setExpenses((prevExpenses) => {
        return [...prevExpenses, { id: docSnap.id, items: [], ...category }];
      });
    } catch (error) {
      console.log(error.message);
    }
  };
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
  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, "expense", expenseCategoryId);
    try {
      await updateDoc(docRef, { ...newExpense });

      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];
        const foundIndex = updatedExpenses.findIndex((expense) => {
          return expense.id === expenseCategoryId;
        });
        updatedExpenses[foundIndex] = {
          id: expenseCategoryId,
          ...newExpense,
        };
        return updatedExpenses;
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
  const deleteExpenseItem = async (updateExpense, expenseCategoryId) => {
    try {
      const docRef = doc(db, "expense", expenseCategoryId);
      await updateDoc(docRef, { ...updateExpense });
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        const pos = updatedExpenses.findIndex(
          (ex) => ex.id === expenseCategoryId
        );
        updatedExpenses[pos].items = [...updateExpense.items];
        updatedExpenses[pos].total = updateExpense.total;

        return updatedExpenses;
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteExpenseCategory = async (expenseCategoryId) => {
    try {
      const docRef = doc(db, "expense", expenseCategoryId);
      await deleteDoc(docRef);
      setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter(
          (expense) => expense.id !== expenseCategoryId
        );
        return [...updatedExpenses];
      });
    } catch (error) {
      console.log(error.message);
      throw error.message;
    }
  };
  const value = {
    income,
    expenses,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
    addCategory,
    deleteExpenseItem,
    deleteExpenseCategory,
  };
  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");

      const docSnap = await getDocs(collectionRef);

      const data = docSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });

      setIncome(data);
    };
    const getExpensesData = async () => {
      const collectionRef = collection(db, "expense");
      const docSnap = await getDocs(collectionRef);

      const data = docSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setExpenses(data);
    };
    getExpensesData();
    getIncomeData();
  }, []);

  return (
    <expenseContext.Provider value={value}>{children}</expenseContext.Provider>
  );
}
