export const getImageDimensions = async (
    file: File,
): Promise<{ width: number; height: number }> => {
    const buffer = await file.arrayBuffer();
    const blob = new Blob([buffer]);
    const url = URL.createObjectURL(blob);
    const img = new Image();

    return new Promise((resolve, reject) => {
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            URL.revokeObjectURL(url);
            resolve({ width, height });
        };

        img.onerror = err => {
            URL.revokeObjectURL(url);
            reject(err);
        };

        img.src = url;
    });
};
