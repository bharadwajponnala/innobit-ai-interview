import React from "react";
import Logo from "../Logo";
import ChecklistCard from "./ChecklistCard";

const InstructionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center justify-center px-4">
      <Logo />
      <ChecklistCard />
    </div>
  );
};

export default InstructionPage;
