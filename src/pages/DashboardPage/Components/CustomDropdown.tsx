import { Calendar } from "@assets/icons/svg";
import { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  font-size: 16px;
  color: #4a5568;
  background-color: #f7fafc;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #edf2f7;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  margin: 0;
  padding: 5px 0;
  list-style: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 150px;
  z-index: 100;
`;

const DropdownItem = styled.li`
  padding: 10px 15px;
  font-size: 14px;
  color: #4a5568;
  cursor: pointer;
  &:hover {
    background-color: #edf2f7;
  }
`;

const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Monthly");

  const options = ["Weekly", "Monthly", "Yearly"];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        <Calendar />
        {selectedOption}
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default CustomDropdown;
