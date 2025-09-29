class DataValidator {
    static validate(data) {
        const errors = [];

        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            const rowNum = i + 1;

            if (row.length < 1 || row.length > 4) {
                errors.push(`第 ${rowNum} 行：長度值 ${row.length} 超出範圍 (1-4)`);
            }

            if (row.height < 1 || row.height > 100) {
                errors.push(`第 ${rowNum} 行：高度值 ${row.height} 超出範圍 (1-100)`);
            }

            if (row.size < 1 || row.size > 127) {
                errors.push(`第 ${rowNum} 行：大小值 ${row.size} 超出範圍 (1-127)`);
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    static getDataStatistics(data) {
        if (data.length === 0) return null;

        const totalLength = data.reduce((sum, row) => sum + row.length, 0);
        const maxHeight = Math.max(...data.map(row => row.height));
        const minHeight = Math.min(...data.map(row => row.height));
        const avgSize = data.reduce((sum, row) => sum + row.size, 0) / data.length;

        return {
            totalRecords: data.length,
            totalLength,
            maxHeight,
            minHeight,
            averageSize: Math.round(avgSize * 100) / 100
        };
    }
}