class CSVParser {
    static parse(csvText) {
        const lines = csvText.trim().split('\n');
        const data = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line === '') continue;

            const values = line.split(',').map(v => v.trim());

            if (values.length !== 3) {
                throw new Error(`第 ${i + 1} 行格式錯誤：需要3個欄位，但找到 ${values.length} 個`);
            }

            const length = parseInt(values[0]);
            const height = parseInt(values[1]);
            const size = parseInt(values[2]);

            if (isNaN(length) || isNaN(height) || isNaN(size)) {
                throw new Error(`第 ${i + 1} 行包含非數字值`);
            }

            data.push({ length, height, size });
        }

        return data;
    }

    static generateSampleData() {
        const data = [];
        for (let i = 0; i < 40; i++) {
            data.push({
                length: Math.floor(Math.random() * 4) + 1,
                height: Math.floor(Math.random() * 100) + 1,
                size: Math.floor(Math.random() * 127) + 1
            });
        }
        return data;
    }
}