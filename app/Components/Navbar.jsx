"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const pathname = usePathname();

  const dashboardRoutes = ["/dashboard", "/add-funds", "/add-expenses"];

  const isDashboard = dashboardRoutes.some(route =>
    pathname.startsWith(route)
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <style>{`
        /* Mobile Menu Overlay */
        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1000;
        }

        .mobile-menu-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        /* Mobile Menu Drawer */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 280px;
          height: 100vh;
          background: white;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          z-index: 1001;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          padding: 5rem 2rem 2rem;
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        /* Mobile Menu Close Button */
        .mobile-close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0F172A;
          transition: color 0.3s ease;
        }

        .mobile-close-btn:hover {
          color: #6366F1;
        }

        /* Mobile Menu Links */
        .mobile-menu a {
          display: block;
          padding: 1rem 1.25rem;
          color: #0F172A;
          text-decoration: none;
          font-size: 1.125rem;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.3s ease;
          margin-bottom: 0.5rem;
        }

        .mobile-menu a:hover {
          background: rgba(99, 102, 241, 0.1);
          color: #6366F1;
          transform: translateX(4px);
        }

        /* Mobile Menu Logout Button */
        .mobile-logout-btn {
          display: block;
          width: 100%;
          padding: 1rem 1.25rem;
          margin-top: 1rem;
          background: linear-gradient(135deg, #EF4444, #DC2626);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .mobile-logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
        }

        /* Desktop Logout Button Fix */
        .donate-btn {
          background: linear-gradient(135deg, #6366F1, #EC4899);
          color: white;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .donate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }

        /* Logout Button Specific Styling */
        .logout-btn {
          background: linear-gradient(135deg, #EF4444, #DC2626) !important;
          color: white !important;
        }

        .logout-btn:hover {
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4) !important;
        }

        /* Hide mobile menu on desktop */
        @media (min-width: 969px) {
          .mobile-menu,
          .mobile-menu-overlay {
            display: none !important;
          }
        }
      `}</style>

      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <Heart size={32} style={{ color: isDashboard ? "#6366F1" : "white" }} />
          </div>

          {/* DESKTOP MENU */}
          <ul className="nav-menu">
            {!isDashboard ? (
              <>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><button className="donate-btn"><a href="/login">Login</a></button></li>
              </>
            ) : (
              <>
                <li><a href="/dashboard" style={{ color: "#0F172A" }}>Dashboard</a></li>
                <li><a href="/add-funds" style={{ color: "#0F172A" }}>Add Funds</a></li>
                <li><a href="/add-expenses" style={{ color: "#0F172A" }}>Add Expenses</a></li>
                <li>
                  <button 
                    className="donate-btn logout-btn" 
                    onClick={handleLogout}
                    style={{ 
                      background: "linear-gradient(135deg, #EF4444, #DC2626)",
                      color: "white"
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* MOBILE TOGGLE */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: isDashboard ? "#0F172A" : "white" }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* MOBILE MENU DRAWER */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button 
          className="mobile-close-btn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X size={28} />
        </button>

        {!isDashboard ? (
          <>
            <a onClick={() => setMobileMenuOpen(false)} href="#home">Home</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#about">About</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#projects">Projects</a>
            <button className="mobile-logout-btn donate-btn"><a href="/login">Login</a></button>
          </>
        ) : (
          <>
            <a onClick={() => setMobileMenuOpen(false)} href="/dashboard">Dashboard</a>
            <a onClick={() => setMobileMenuOpen(false)} href="/add-funds">Add Funds</a>
            <a onClick={() => setMobileMenuOpen(false)} href="/add-expenses">Add Expenses</a>
            <button 
              className="mobile-logout-btn" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;