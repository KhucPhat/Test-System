import { jsonKeyNumber, jsonMapString } from "@/constants/lists/listJson";
import TestChangeValueAndKeyJson from "./TestDataJson/TestChangeValueAndKeyJson";
import ValidateValueChangeJson from "./TestDataJson/TestValidateChangeValueJson";
import TestChangeInputPerforment from "./TestChangeInput/TestPerformentChangeInput";
import TestCharBasic from "./TestChart/TestCharBasic";

function Test() {
  return (
    <div>
      {/* <h1>JSON Data Viewer</h1>
      <TestChangeValueAndKeyJson data={JSON.parse(jsonKeyNumber)} /> */}
      {/* <TestChangeInputPerforment /> */}
      <TestCharBasic />
    </div>
  );
}

export default Test;
