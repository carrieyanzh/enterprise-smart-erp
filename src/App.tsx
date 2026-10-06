/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";

import DashboardLayout from "./components/DashboardLayout.jsx";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import ProductsManagement from "./components/ProductsManagement.jsx";
import FiscalCalendar from "./components/FiscalCalendar.jsx";
import AccountSettings from "./components/AccountSettings.jsx";
import AboutView from "./components/AboutView.jsx";

import HomeView from "./components/HomeView.jsx";
import LogoutModal from "./components/LogoutModal";
import events from "./data/events.json"; // Make sure path points correctly to your JSON file

export default function App() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [currentTopMenu, setCurrentTopMenu] = useState("Dashboard");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleNavigate = (itemId: string) => {
    if (itemId === "logout") {
      setShowLogoutModal(true);
      return;
    }

    setActiveItem(itemId);

    if (itemId === "dashboard") {
      setCurrentTopMenu("Dashboard");
    } else {
      setCurrentTopMenu("");
    }
  };

  const handleTopMenuChange = (menuId: string) => {
    setCurrentTopMenu(menuId);
    if (menuId === "Dashboard") {
      setActiveItem("dashboard");
    } else if (menuId === "About") {
      setActiveItem("about");
    } else if (menuId === "Home") {
      setActiveItem("home");
    }
  };

  const handleSignOut = () => {
    setShowLogoutModal(false);
    handleNavigate("dashboard"); // Or whatever your navigation function is named
  };

  return (
    <>
      <DashboardLayout
        activeItem={activeItem}
        onNavigate={handleNavigate}
        currentTopMenu={currentTopMenu}
        onTopMenuChange={handleTopMenuChange}
      >
        {activeItem === "dashboard" && (
          <DashboardOverview
            onNavigateToProducts={() => handleNavigate("products")}
          />
        )}

        {activeItem === "products" && <ProductsManagement />}

        {activeItem === "calendar" && <FiscalCalendar />}

        {activeItem === "account" && <AccountSettings />}

        {activeItem === "about" && <AboutView />}

        {activeItem === "home" && <HomeView onNavigate={handleNavigate} />}
      </DashboardLayout>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleSignOut}
        />
      )}
    </>
  );
}
