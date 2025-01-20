import { PrimaryButton, SizedBox, Spacer } from "@components";
import { Flex } from "antd";
import { SingleSelectChip } from "@components";
import FilterButton from "pages/GuestPage/components/FilterButton";
import { useState } from "react";
import DealModal from "./DealModal";

const DealHeader = () => {
  const [selectedOption, setSelectedOption] = useState("Ongoing");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);
  const handleSave = () => {
    setModalVisible(false);
    console.log("Deal Saved");
  };
  return (
    <div>
      <Flex align="center">
        <SingleSelectChip
          options={["Ongoing", "Finished"]}
          selectedOption={selectedOption}
          onOptionChange={(e) => {
            setSelectedOption(e);
          }}
        />
        <Spacer />
        <PrimaryButton title="Add deal" onClick={handleOpenModal} />
        <SizedBox width={20} />
        <FilterButton
          options={["Ongoing", "Full", "Inactive", "New"]}
          selectedFilter={selectedFilter}
          onFilterChange={(e) => {
            setSelectedFilter(e);
          }}
        />
      </Flex>

      <SizedBox height={20} />
      <DealModal
        visible={modalVisible}
        onCancel={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default DealHeader;
