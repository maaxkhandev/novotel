import { Search } from "@assets/icons/svg";
import { Input } from "antd";
import styled from "styled-components";

interface Props {
  hint: string;
  onChange: (value: string) => void;
}

export const CustomSearchBar = (props: Props) => {
  return (
    <StyledInput
      placeholder={props.hint}
      onChange={(e) => props.onChange(e.target.value)}
      prefix={<Search />}
    />
  );
};

const StyledInput = styled(Input)`
  max-width: 300px;
  back
`;
export default CustomSearchBar;
