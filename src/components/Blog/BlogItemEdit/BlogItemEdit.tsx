import { GoBack } from "@/components";
import { faqServie } from "@/shared/api";
import { Segment } from "@/shared/ui-kit";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Flex, Space, Tooltip, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { FaqDeleteItemButton } from "../FaqDeleteItemButton";
import { FaqInfoForm } from "../FaqInfoForm";
import { useFaqItemEdit } from "./FaqItemEdit.hook";
import { IFaqItemEdit } from "./FaqItemEdit.type";

export const FaqItemEdit = ({ ...props }: IFaqItemEdit) => {
  const { faqItemId, form, editFaqItem, onSubmit } = useFaqItemEdit();
  const navigate = useNavigate();

  const onSubmitForm = async () => {
    try {
      onSubmit();
      navigate("/faq");
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteFaq = async () => {
    try {
      const response = await faqServie.deleteFaqItem(faqItemId || "");
      notification.success({
        message: response.data.text,
      });
      navigate("/faq");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notification.error({
        message: error.data.text || "Ошибка при удалении",
      });
    }
  };

  return (
    <>
      <Segment {...props}>
        <Flex align="center" justify="space-between">
          <GoBack to="/faq" />
          <Space align="center">
            <Tooltip title="Удалить">
              <FaqDeleteItemButton
                danger
                faqItemId={faqItemId!}
                icon={<DeleteOutlined />}
                isRedirect
                shape="circle"
                onClick={() => onDeleteFaq()}
              />
            </Tooltip>
            <Tooltip title="Сохранить">
              <Button
                icon={<SaveOutlined />}
                loading={editFaqItem.isPending}
                shape="circle"
                type="primary"
                onClick={() => onSubmitForm()}
              />
            </Tooltip>
          </Space>
        </Flex>
      </Segment>
      <Segment>
        <FaqInfoForm form={form} onFinish={onSubmit} />
      </Segment>
    </>
  );
};
