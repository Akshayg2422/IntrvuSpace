import React, { useEffect, useState } from "react";
import { TabPanel } from "react-headless-tabs";
import type { TabsProps, TabItem } from "./interfaces";
import { useWindowDimensions } from '@Hooks'
import { Card } from '@Components'

export function Tabs({ tabs, selected, onChange, height }: TabsProps) {
  //const { height } = useWindowDimensions()

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
                  background: selected?.id === item.id ? "#ffffff" : "#ffffff",
                  position: "relative", // Add this line
                }}
                onClick={() => { changeTab(item) }}
                data-tab={item}
              >
                {item.title}

                {/* Display the colored bar at the bottom */}
                {selected?.id === item.id && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: "4px",
                      width: "100%",
                      background: "#67f60e",
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
            <TabPanel key={item.id} hidden={selected?.id !== item.id}>
              {item.component}
            </TabPanel>
          );
        })}
      </div>
    </div>
  );
}
