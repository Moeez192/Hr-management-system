import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS, NavItem } from '../constants';

interface LayoutProps {
  activeView: string;
  setActiveView: (view: string) => void;
  children: React.ReactNode;
}

const Sidebar: React.FC<{ activeView: string; setActiveView: (view: string) => void, isMobileMenuOpen: boolean }> = ({ activeView, setActiveView, isMobileMenuOpen }) => {
  return (
    <aside className={`absolute md:relative inset-y-0 left-0 bg-secondary text-white w-64 md:w-20 lg:w-64 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col`}>
       <div className="flex items-center justify-center h-20 border-b border-slate-700">
        <h1 className="text-2xl font-bold lg:block md:hidden">ZenithHR</h1>
        <h1 className="text-2xl font-bold md:block lg:hidden">Z</h1>
      </div>
      <nav className="flex-grow mt-4">
        {NAV_ITEMS.map((item: NavItem) => (
          <a
            key={item.name}
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveView(item.name); }}
            className={`flex items-center py-3 px-6 my-1 transition-colors duration-200 ${
              activeView === item.name
                ? 'bg-primary text-white'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="mx-4 font-medium lg:inline-block md:hidden">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="flex justify-between items-center px-6 py-2 bg-white border-b border-slate-200 z-20">
      <div>
        <button onClick={onMenuClick} className="text-gray-500 focus:outline-none md:hidden">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="flex items-center">
         <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="relative z-10 block h-10 w-10 rounded-full overflow-hidden border-2 border-transparent focus:outline-none focus:border-primary">
              <img className="h-full w-full object-cover" src="https://picsum.photos/100/100" alt="User"/>
            </button>
            
            {isDropdownOpen && (
                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-20">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">Logout</a>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};


export const Layout: React.FC<LayoutProps> = ({ activeView, setActiveView, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isMobileMenuOpen={isMobileMenuOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
