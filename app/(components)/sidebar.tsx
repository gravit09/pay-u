"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Home, Send, Clock, Menu, X, Wallet, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [userName, setUserName] = useState<string>("");

  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const initSession = async () => {
      const session = await getSession();
      if (session?.user?.id) {
        setUserName(session.user.username || "");
      }
    };
    initSession();
  }, []);

  const handleItemClick = (label: string, path: string) => {
    setActiveItem(label);
    router.push(path);
  };

  return (
    <div className="flex h-screen">
      <motion.div
        animate={{ width: isOpen ? 250 : 80 }}
        className="bg-gray-900 text-gray-200 h-screen flex flex-col transition-all duration-300 shadow-lg relative"
      >
        <div className="p-4 border-b border-gray-800">
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white transition p-1 rounded-md hover:bg-gray-800"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 p-4 border-b border-gray-800">
          {isOpen && <p className="text-lg font-medium">{userName}</p>}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4 flex-grow">
          <div className={`mb-2 ${isOpen ? "text-left" : "text-center"}`}>
            {isOpen ? (
              <h3 className="text-xs uppercase text-gray-500 tracking-wider">
                Main Menu
              </h3>
            ) : (
              <div className="h-4"></div>
            )}
          </div>
          <div className="space-y-1">
            <SidebarItem
              icon={<Home size={20} />}
              label="Dashboard"
              isOpen={isOpen}
              isActive={activeItem === "Dashboard"}
              onClick={() => handleItemClick("Dashboard", "/dashboard")}
            />
            <SidebarItem
              icon={<Wallet size={20} />}
              label="Wallet"
              isOpen={isOpen}
              isActive={activeItem === "Wallet"}
              onClick={() => handleItemClick("Wallet", "/wallet")}
            />
            <SidebarItem
              icon={<Send size={20} />}
              label="Transfer"
              isOpen={isOpen}
              isActive={activeItem === "Transfer"}
              onClick={() => handleItemClick("Transfer", "/transfer")}
            />
            <SidebarItem
              icon={<Clock size={20} />}
              label="Transactions"
              isOpen={isOpen}
              isActive={activeItem === "Transactions"}
              onClick={() => handleItemClick("Transactions", "/transcations")}
            />
            <SidebarItem
              icon={<LogOut size={20} />}
              label="Logout"
              isOpen={isOpen}
              isActive={activeItem === "Logout"}
              onClick={async () => {
                await signOut();
                router.push("/");
              }}
            />
          </div>
        </nav>

        {/* Footer */}
        <div
          className={`p-4 border-t border-gray-800 ${
            !isOpen && "flex justify-center"
          }`}
        >
          {isOpen ? (
            <p className="text-xs text-gray-500">© 2025 PayU App</p>
          ) : (
            <span className="text-xs text-gray-500">©</span>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Sidebar Item Component
const SidebarItem = ({
  icon,
  label,
  isOpen,
  isActive,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center ${
        isOpen ? "justify-start" : "justify-center"
      } w-full space-x-3 p-3 rounded-lg transition-all ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:text-white hover:bg-gray-800"
      }`}
    >
      <span className={isActive ? "text-white" : "text-gray-400"}>{icon}</span>
      {isOpen && (
        <span className={`text-sm font-medium ${isActive ? "text-white" : ""}`}>
          {label}
        </span>
      )}
    </button>
  );
};
