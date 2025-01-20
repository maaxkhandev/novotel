import { Modal, Form, Button, Select, InputNumber, Flex } from "antd";
import styled from "styled-components";
import { useRateContext } from "@hooks";
import { IRateModel } from "@types";
import { APPDATA } from "@constants";

export const AddRateModal = ({ visible, onCancel, onSubmit }) => {
  const { addRates } = useRateContext();
  const [form] = Form.useForm();
  const cancellationPolicies = ["Strict", "Flexible", "Non-refundable"];
  const deals = [
    "Family deal",
    "Christmas deal",
    "Black Friday",
    "Weekend Special",
  ];

  const handleSave = () => {
    form
      .validateFields()
      .then((values: IRateModel) => {
        const sanitizedValues = {
          ...values,
          deal: values.deal || null,
        };

        addRates(sanitizedValues);
        onSubmit(sanitizedValues);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Add New Rate"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          roomType: undefined,
          deal: undefined,
          cancellationPolicy: undefined,
          dealPrice: 0,
          rate: 0,
          availability: 0,
        }}
      >
        <Flex justify="space-between">
          <FormItemDiv
            name="roomType"
            label="Room Type"
            rules={[{ required: true, message: "Room type is required!" }]}
          >
            <Select placeholder="Select a room type">
              {APPDATA.roomTypes.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </FormItemDiv>
          <FormItemDiv
            name="totalCapacity"
            label="Total Capicity"
            rules={[{ required: true, message: "Total capicity is required!" }]}
          >
            <InputNumber
              placeholder="Enter capicity"
              min={0}
              style={{ width: "100%" }}
            />
          </FormItemDiv>
        </Flex>
        <Flex justify="space-between">
          <FormItemDiv
            name="cancellationPolicy"
            label="Cancellation Policy"
            rules={[
              { required: true, message: "Cancellation policy is required!" },
            ]}
          >
            <Select placeholder="Select a cancellation policy">
              {cancellationPolicies.map((policy) => (
                <Select.Option key={policy} value={policy}>
                  {policy}
                </Select.Option>
              ))}
            </Select>
          </FormItemDiv>
          <FormItemDiv
            name="pricePerDay"
            label="Price per day ($)"
            rules={[{ required: true, message: "Deal price is required!" }]}
          >
            <InputNumber
              placeholder="Enter price per day"
              min={0}
              style={{ width: "100%" }}
            />
          </FormItemDiv>
        </Flex>
        <Flex justify="space-between">
          <FormItemDiv name="deal" label="Deal">
            <Select placeholder="Select a deal">
              {deals.map((deal) => (
                <Select.Option key={deal} value={deal}>
                  {deal}
                </Select.Option>
              ))}
            </Select>
          </FormItemDiv>
        </Flex>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>
            Add Rate
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const FormItemDiv = styled(Form.Item)`
  margin-bottom: 16px;
  min-width: 220px;
`;
