import { useState } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import styled from "styled-components";
import { COLORS } from "@constants";
import { Menu, Dropdown } from "antd";
import { SizedBox } from "@components";

interface FilterButtonProps {
  options: string[];
  selectedFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const FilterButton = ({
  options = [], // Default empty array
  selectedFilter,
  onFilterChange,
}: FilterButtonProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuClick = (filter: string) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
    setMenuVisible(false); // Close the menu after selecting an option
  };

  const menu = (
    <StyledMenu>
      {Array.isArray(options) &&
        options.map((option, index) => (
          <Menu.Item key={index} onClick={() => handleMenuClick(option)}>
            {option}
          </Menu.Item>
        ))}
    </StyledMenu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      visible={menuVisible}
      onVisibleChange={(visible) => setMenuVisible(visible)}
    >
      <FilterButtonStyle>
        <AiOutlineFilter />
        <SizedBox width={10} />
        <p>{selectedFilter ? `Filter: ${selectedFilter}` : "Filter"}</p>
      </FilterButtonStyle>
    </Dropdown>
  );
};

const FilterButtonStyle = styled.div`
  display: flex;
  font-size: 20px;
  color: ${COLORS.grey};
  justify-content: center;
  align-items: center;
  border: 1px solid #7f8797;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  background-color: white;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const StyledMenu = styled(Menu)`
  border-radius: 8px;
  padding: 5px 0;
`;

export default FilterButton;
