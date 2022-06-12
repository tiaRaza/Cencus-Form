import fs from "file-system";

const fileUtils = () => {
    const WriteFile = async (fileName, fileContent) => {
        const fileLocation = "./failed/"
        try {
            await fs.writeFile(`${fileLocation}${fileName}.txt`, fileContent)
        } catch (err) {
            console.error(err);
        }
    }
    return {
        WriteFile
    }
}

const FileUtils = fileUtils();

export default FileUtils;