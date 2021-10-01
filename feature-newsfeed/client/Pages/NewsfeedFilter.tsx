import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface TabProps {
  state: "active" | "inactive";
}

interface Props<Tabs extends string[]> {
  tabs: Tabs;
  activeTab: Tabs[number];
  onTabClick: Dispatch<SetStateAction<Tabs[number]>>;
}

export default function NewsfeedFilter<Tabs extends string[] = string[]>({
  tabs,
  activeTab,
  onTabClick,
}: Props<Tabs>) {
  return (
    <>
      <ButtonGroup>
        {tabs.map((tab) => (
          <Tab
            key={tab}
            state={activeTab === tab ? "active" : "inactive"}
            onClick={() => onTabClick(tab)}
          >
            {tab}
          </Tab>
        ))}
      </ButtonGroup>
    </>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
`;

const Tab = styled.button<TabProps>`
  font-size: 20px;
  padding: 10px 20px;
  cursor: pointer;
  opacity: 0.6;
  border: 0;
  outline: 0;
  ${({ state }) =>
    state === "active" &&
    `
      border-bottom: 2px solid black;
      opacity: 1;
      padding: 10px 20px;
      flex-grow: 1;
    `}
`;
