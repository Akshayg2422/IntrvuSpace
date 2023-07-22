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
      <nav

      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: `calc((100% / ${tabs.length}) * ${getSelectedTabIndex()})`,
            height: "2px",
            width: `calc(100% / ${tabs.length})`,
            //background: "#BFEDF0",
            transition: "all ease 0.2s",
          }}
        />
        <div
          style={{
            display: "flex",
          }}
        >
          {tabs.map((item: TabItem) => {
            return (
              <a
                key={item.id}
                className="text-uppercase text-sm font-weight-bold"
                style={{
                  flexGrow: 1,
                  display: "block",
                  padding: "1rem",
                  textDecoration: "none",
                  color: "#32325d",
                  background: selected?.id === item.id ? "#ffffff" : "#ffffff",
                }}
                onClick={() => { changeTab(item) }}
                data-tab={item}
              >
                {item.title}

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
    </div >
  );
}
