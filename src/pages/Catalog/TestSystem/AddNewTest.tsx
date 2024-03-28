import { ButtonInherit } from "@/component";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import CreateUpdateTest from "./CreateUpdateTest";
import TableTest from "./TableTest";
import React from "react";
import _ from "lodash";

const AddNewTest = () => {
  const [listAttributes, setListAttributes] = useState<any>([
    {
      id: "1",
      attribute_name: "effDate",
      attribute_type: 0,
      primitive_type: 0,
      object_type: "balance",
      suggest_body: "yyyy/MM/dd HH:mm:ss",
      displayed_rule: 2,
      action_delete: true,
      selected: false,
    },
  ]);
  const fetchGetListData = async () => {
    let response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    return response.data;
  };

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchGetListData,
    staleTime: Infinity,
  });

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      description: "",
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    if (data) {
      const tempData = {
        id: data.id,
        name: data.title,
        description: data.body,
      };

      formik.setValues(tempData);
    }
  }, [data]);

  return (
    <Box sx={{ width: "100%" }}>
      <CreateUpdateTest formik={formik} data={data} />
      <Box sx={{ padding: "80px 0px 10px", width: "100%", textAlign: "right" }}>
        <ButtonInherit
          title="Add Attribute"
          loading={false}
          disabled={false}
          style={{
            backgroundColor: "#ff0000bf",
            border: "unset",
            color: "#fff",
            textTransform: "inherit",
          }}
          backgroundColor="#ff0000bf"
          action={() => {
            setListAttributes((prev) => [
              ...prev,
              {
                id: "2",
                attribute_name: "",
                attribute_type: null,
                primitive_type: null,
                object_type: "balance",
                suggest_body: "yyyy/MM/dd HH:mm:ss",
                displayed_rule: null,
                action_delete: true,
                selected: false,
              },
            ]);
          }}
        />
      </Box>
      <TableTest
        listAttributes={listAttributes}
        setListAttributes={setListAttributes}
      />
    </Box>
  );
};

export default AddNewTest;
