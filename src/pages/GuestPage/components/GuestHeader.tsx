import { SizedBox, Spacer } from "@components";
import { Flex } from "antd";
import { CustomSearchBar } from "@components";
import { SingleSelectChip } from "@components";
import FilterButton from "./FilterButton";
import { useState } from "react";

const GuestHeader = () => {
  const [selectedOption, setSelectedOption] = useState("Check in");
  const [selectedFilter, setSelectedFilter] = useState("");
  return (
    <div>
      <Flex>
        <SingleSelectChip
          options={["Check in", "Check out"]}
          selectedOption={selectedOption}
          onOptionChange={(e) => {
            setSelectedOption(e);
          }}
        />
        <Spacer />
        <FilterButton
          options={["Price", "Location", "Rating"]}
          selectedFilter={selectedFilter}
          onFilterChange={(e) => {
            setSelectedFilter(e);
          }}
        />
        <SizedBox width={20} />
        <CustomSearchBar
          hint="Search by room number"
          onChange={(v) => {
            console.log(v);
          }}
        />
      </Flex>

      <SizedBox height={20} />
    </div>
  );
};

export default GuestHeader;
