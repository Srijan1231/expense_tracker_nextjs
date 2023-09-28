"use client";
import ExpenseContextProvider from "@/lib/store/expense-context";
import "./globals.css";

import Navigation from "@/components/Navigation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ExpenseContextProvider>
          <Navigation />
          {children}
        </ExpenseContextProvider>
      </body>
    </html>
  );
}
