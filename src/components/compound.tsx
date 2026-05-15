import React, { createContext, useContext, useState } from "react";

type TabsContextType = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Must be used inside <Tabs>");
  return ctx;
}

export function Tabs({
  children,
  defaultIndex = 0,
}: {
  children: React.ReactNode;
  defaultIndex?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabList({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        borderBottom: "1px solid #e5e7eb",
        paddingBottom: "0",
      }}
    >
      {children}
    </div>
  );
}

export function Tab({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const { activeIndex, setActiveIndex } = useTabs();
  const isActive = activeIndex === index;

  return (
    <button
      role='tab'
      aria-selected={isActive}
      onClick={() => setActiveIndex(index)}
      style={{
        padding: "0.75rem 1.25rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: isActive ? "#ffffff" : "#6b7280",
        backgroundColor: "transparent",
        border: "none",
        borderBottom: isActive ? "2px solid #aa3bff" : "2px solid transparent",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontFamily: "inherit",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </button>
  );
}

export function TabPanel({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const { activeIndex } = useTabs();
  if (activeIndex !== index) return null;

  return (
    <div
      style={{
        marginTop: "1.5rem",
        padding: "1.5rem",
        backgroundColor: "#f9fafb",
        borderRadius: "0.5rem",
        border: "1px solid #e5e7eb",
        color: "#374151",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

export default function () {
  return (
    <Tabs defaultIndex={0}>
      <TabList>
        <Tab index={0}>Component</Tab>
        <Tab index={1}>State</Tab>
      </TabList>
      <TabPanel index={0}>
        A set of components that work together implicitly
      </TabPanel>
      <TabPanel index={1}>They share state via context</TabPanel>
    </Tabs>
  );
}
