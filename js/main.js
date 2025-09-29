class ChartApp {
    constructor() {
        this.canvas = document.getElementById('chart');
        this.chartDrawer = new ChartDrawer(this.canvas);
        this.currentData = null;

        this.initEventListeners();
    }

    initEventListeners() {
        const csvFileInput = document.getElementById('csvFile');
        const loadSampleButton = document.getElementById('loadSample');

        csvFileInput.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files[0]);
        });

        loadSampleButton.addEventListener('click', () => {
            this.loadSampleData();
        });
    }

    async handleFileUpload(file) {
        if (!file) return;

        try {
            const text = await this.readFileAsText(file);
            const data = CSVParser.parse(text);
            this.processData(data);
        } catch (error) {
            this.showError('檔案讀取錯誤: ' + error.message);
        }
    }

    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = e => reject(e.target.error);
            reader.readAsText(file);
        });
    }

    loadSampleData() {
        const sampleData = CSVParser.generateSampleData();
        this.processData(sampleData);
    }

    processData(data) {
        try {
            const validation = DataValidator.validate(data);

            if (!validation.isValid) {
                this.showError('資料驗證失敗:\n' + validation.errors.join('\n'));
                return;
            }

            this.currentData = data;
            this.chartDrawer.drawChart(data);
            this.displayDataInfo(data);

        } catch (error) {
            this.showError('資料處理錯誤: ' + error.message);
        }
    }

    displayDataInfo(data) {
        const stats = DataValidator.getDataStatistics(data);
        const infoElement = document.getElementById('dataInfo');

        infoElement.textContent = `
資料統計:
- 總筆數: ${stats.totalRecords}
- 總長度: ${stats.totalLength}
- 最大高度: ${stats.maxHeight}
- 最小高度: ${stats.minHeight}
- 平均大小: ${stats.averageSize}

前5筆資料:
${data.slice(0, 5).map((row, i) =>
    `${i + 1}. 長度:${row.length}, 高度:${row.height}, 大小:${row.size}`
).join('\n')}
        `;
    }

    showError(message) {
        const infoElement = document.getElementById('dataInfo');
        infoElement.textContent = '錯誤: ' + message;
        infoElement.style.color = 'red';

        setTimeout(() => {
            infoElement.style.color = '';
        }, 5000);
    }
}

// 初始化應用程式
document.addEventListener('DOMContentLoaded', () => {
    window.chartApp = new ChartApp();
});