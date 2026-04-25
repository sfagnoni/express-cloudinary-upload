import fs from "fs/promises";

export const deleteTempFile = async (filePath) => {
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(
      `Temporary file could not be deleted: ${error.message}.`
    );
  }
};