import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useDropzone } from "react-dropzone";

const Test = () => {
  const now = dayjs();
  const { getRootProps, getInputProps } = useDropzone({
    // Disable click and keydown behavior

    noClick: true,
    accept: '.xlsx, .xls' as any,
    noKeyboard: true,
    onDropRejected: () => {
      alert("File is not supported");
    },
    onDrop: (files) => {
    }
  });
  return (
    <>
      <div className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} style={{ display: "block" }} />
          {/* <p>Drag 'n' drop some files here</p> */}
          {/* <button type="button" onClick={open}>
        Open File Dialog
      </button> */}
        </div>
        {/* <aside>
      <h4>Files</h4>
      <ul>{files}</ul>
    </aside> */}
      </div>
    </>
  );
};

export default Test;
