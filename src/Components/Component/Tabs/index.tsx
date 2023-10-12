import React, { useEffect, useState } from "react";
import { TabPanel } from "react-headless-tabs";
import type { TabsProps, TabItem } from "./interfaces";
import { useWindowDimensions } from "@Hooks";
import { Card } from "@Components";

export function Tabs({ tabs, selected, onChange, height }: TabsProps) {
  // const { height } = useWindowDimensions()

  const changeTab = (item: TabItem) => {
    if (onChange) {
      onChange(item);
    }
  };

  const getSelectedTabIndex = () =>
    tabs.findIndex((item) => item.id === selected?.id);

  return (
    <div>
      <nav>
        <div
          style={{
            display: "flex",
            flexDirection: "row", // Display tabs in a row for all screens
            flexWrap: "wrap", // Wrap tabs to the next line if the screen is too narrow
          }}
        >
          {tabs.map((item: TabItem) => {
            return (
              <a
                key={item.id}
                className="text-sm"
                style={{
                  flexGrow: 1,
                  display: "block",
                  padding: "1rem",
                  textDecoration: "none",
                  color: selected?.id === item.id ? "#000000" : "#cac9cd",
                  background:
                    selected?.id === item.id ? "#ffffff" : "#ffffff",
                  position: "relative",
                  flex: "0 0 0 50%", // Make tabs take 50% of the width for small screens
                }}
                onClick={() => {
                  changeTab(item);
                }}
                data-tab={item}
              >
                {item.title}

                {/* Display the colored bar at the bottom */}
                {selected?.id === item.id && (
                  <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",        // Horizontally center the div
                    transform: "translateX(-50%)",  // Adjust for centering
                    height: "4px",
                    width: "70%",
                    background: "#001532",
                  }}
                />                
                )}
              </a>
            );
          })}
        </div>
      </nav>
      <div>
        {tabs.map((item: TabItem) => {
          return (
            <TabPanel
              key={item.id}
              hidden={selected?.id !== item.id}
            >
              {item.component}
            </TabPanel>
          );
        })}
      </div>
    </div>
  );
}
