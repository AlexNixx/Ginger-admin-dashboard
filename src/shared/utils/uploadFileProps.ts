import { message, Upload, type UploadProps } from "antd";

export const uploadFileProps: UploadProps = {
    beforeUpload: (file) => {
        const isPNG = file.type === "image/png";
        if (!isPNG) {
            message.error(`${file.name} is not a png file`);
        }
        return isPNG || Upload.LIST_IGNORE;
    },
};