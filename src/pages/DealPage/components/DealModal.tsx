import React from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Flex,
  InputNumber,
} from "antd";
import styled from "styled-components";
import { useDealContext } from "@hooks";
import { APPDATA } from "@constants";
import { Timestamp } from "firebase/firestore";

const { TextArea } = Input;

const DealModal = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const { addDeal } = useDealContext();
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const formattedValues = {
          ...values,
          startDate: values.startDate
            ? Timestamp.fromDate(values.startDate.toDate())
            : null,
          endDate: values.endDate
            ? Timestamp.fromDate(values.endDate.toDate())
            : null,
        };

        addDeal(formattedValues);
        onSave();
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal title="Modal" open={visible} footer={null} onCancel={onCancel}>
      <Form form={form} layout="vertical">
        <Flex justify="space-between">
          <FormItemDiv
            label="Deal name"
            name="dealName"
            rules={[{ required: true, message: "Please enter deal name" }]}
          >
            <Input placeholder="Enter deal name" />
          </FormItemDiv>
          <FormItemDiv
            label="Room type"
            name="roomType"
            rules={[{ required: true, message: "Please select room type" }]}
          >
            <Select placeholder="Select room type">
              {APPDATA.roomTypes.map((roomType) => (
                <Select.Option value={roomType}>{roomType}</Select.Option>
              ))}
            </Select>
          </FormItemDiv>
        </Flex>
        <Flex justify="space-between">
          <FormItemDiv
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber
              placeholder="Enter the price of deal"
              style={{ width: "100%" }}
            />
          </FormItemDiv>
          <FormItemDiv
            label="Discount"
            name="discount"
            rules={[{ required: true, message: "Please enter discount value" }]}
          >
            <InputNumber
              placeholder="Enter discount value"
              style={{ width: "100%" }}
            />
          </FormItemDiv>
        </Flex>
        <FormItemDiv
          label="Room facility"
          name="roomFacility"
          rules={[{ required: true, message: "Please enter room facility" }]}
        >
          <TextArea placeholder="Enter a description..." rows={3} />
        </FormItemDiv>

        <Flex justify="space-between">
          <FormItemDiv
            label="Start date"
            name="startDate"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker style={{ width: "100%" }} format="ddd, MMM D YYYY" />
          </FormItemDiv>
          <FormItemDiv
            label="End date"
            name="endDate"
            rules={[{ required: true, message: "Please select end date" }]}
          >
            <DatePicker style={{ width: "100%" }} format="ddd, MMM D YYYY" />
          </FormItemDiv>
        </Flex>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const FormItemDiv = styled(Form.Item)`
  min-width: 220px;
`;

export default DealModal;
