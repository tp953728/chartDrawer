class CSVParser {
    static parse(csvText) {
        const lines = csvText.trim().split('\n');
        const data = [];

        // 從第二行開始處理（跳過標題行）
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line === '') continue;

            const values = line.split(',').map(v => v.trim());

            if (values.length !== 4) {
                throw new Error(`第 ${i + 1} 行格式錯誤：需要4個欄位（姓名,長度,高度,大小），但找到 ${values.length} 個`);
            }

            // 跳過第一個欄位（姓名），解析後三個數值欄位
            const length = parseInt(values[1]);
            const height = parseInt(values[2]);
            const size = parseInt(values[3]);

            if (isNaN(length) || isNaN(height) || isNaN(size)) {
                throw new Error(`第 ${i + 1} 行的數值欄位包含非數字值`);
            }

            data.push({ length, height, size });
        }

        return data;
    }


    static generateSampleData() {
        const names = [
            '張小明', '李美麗', '王大偉', '陳雅婷', '林志偉', '黃淑芬', '吳建國', '蔡佳玲',
            '劉俊傑', '郭雅雯', '楊志華', '賴美玉', '謝志明', '洪雅萍', '孫建成', '馬淑娟',
            '朱志豪', '周美齡', '徐俊宏', '鄭雅文', '蕭志強', '許美慧', '葉建華', '潘淑玲',
            '曾志偉', '范雅君', '董俊男', '石美鳳', '江志成', '游淑惠', '詹建忠', '呂雅芳',
            '沈志勇', '姚美玲', '白建德', '涂淑貞', '康志宏', '溫雅純', '柯建安', '方美霞'
        ];

        const data = [];
        for (let i = 0; i < 40; i++) {
            data.push({
                name: names[i] || `使用者${i + 1}`,
                length: Math.floor(Math.random() * 4) + 1,
                height: Math.floor(Math.random() * 100) + 1,
                size: Math.floor(Math.random() * 127) + 1
            });
        }
        return data;
    }

}