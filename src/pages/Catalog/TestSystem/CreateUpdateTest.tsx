import { InputText } from "@/component";
import { FormikProps } from "formik";
import { memo } from "react";

interface CreateUpdateTestProps {
  formik: FormikProps<any>;
  data: any;
}

const CreateUpdateTest: React.FC<CreateUpdateTestProps> = (props) => {
  const { formik, data } = props;

  const listField = [
    {
      id: "id",
      label: "ID",
      require: true,
      span: 2,
      placeholder: "0",
      style: { width: "70%" },
      defaultValue: formik.values.id,
    },
    {
      id: "name",
      label: "Name",
      require: true,
      span: 10,
      placeholder: "Input Text Here",
      style: { width: "100%" },
      defaultValue: formik.values.name,
    },
    {
      id: "description",
      label: "Description",
      require: false,
      span: 12,
      placeholder: "Input Text Here",
      style: { width: "100%" },
      defaultValue: formik.values.description,
    },
  ];

  return <InputText listField={listField} formik={formik} />;
};

export default memo(CreateUpdateTest);
