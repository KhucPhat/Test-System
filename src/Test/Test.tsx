import {
  jsonKeyNumber,
  jsonMapString,
  listDataAttr1,
  listDataAttrJson,
} from "@/constants/lists/listJson";
import TestChangeValueAndKeyJson from "./TestDataJson/TestChangeValueAndKeyJson";
import ValidateValueChangeJson from "./TestDataJson/TestValidateChangeValueJson";
import TestImportExportJson from "./TestDataJson/TestImportExportJson";

function Test() {
  return (
    <div>
      <h1>JSON Data Viewer</h1>
      {/* <TestChangeValueAndKeyJson data={JSON.parse(jsonMapString)} /> */}
      <TestImportExportJson data={listDataAttr1} />
    </div>
  );
}

export default Test;
