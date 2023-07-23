import { message, Upload, type UploadProps } from "antd";

export const uploadProps: UploadProps = {
    beforeUpload: (file) => {
        const isPNG = file.type === "image/png";
        if (!isPNG) {
            message.error(`${file.name} is not a png file`);
        }
        return isPNG || Upload.LIST_IGNORE;
    },
};