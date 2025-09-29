class ChartDrawer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.padding = { top: 50, right: 50, bottom: 80, left: 80 };
        this.chartWidth = canvas.width - this.padding.left - this.padding.right;
        this.chartHeight = canvas.height - this.padding.top - this.padding.bottom;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawChart(data) {
        this.clear();

        if (!data || data.length === 0) {
            this.drawNoDataMessage();
            return;
        }

        const stats = DataValidator.getDataStatistics(data);
        this.drawAxes(stats);
        this.drawGrid(stats);
        this.drawDataLines(data, stats);
        this.drawLabels(stats);
    }

    drawAxes(stats) {
        const { ctx, padding, chartWidth, chartHeight } = this;

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();

        // X軸
        ctx.moveTo(padding.left, padding.top + chartHeight);
        ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);

        // Y軸
        ctx.moveTo(padding.left, padding.top);
        ctx.lineTo(padding.left, padding.top + chartHeight);

        ctx.stroke();
    }

    drawGrid(stats) {
        const { ctx, padding, chartWidth, chartHeight } = this;

        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;

        // 垂直網格線 (X軸) - 每個刻度都畫線
        const xStep = chartWidth / Math.max(1, stats.totalLength);
        for (let i = 0; i <= stats.totalLength; i++) {
            const x = padding.left + i * xStep;
            ctx.beginPath();
            ctx.moveTo(x, padding.top);
            ctx.lineTo(x, padding.top + chartHeight);
            ctx.stroke();
        }

        // 水平網格線 (Y軸)
        const yStep = chartHeight / Math.max(1, stats.maxHeight);
        for (let i = 0; i <= stats.maxHeight; i += 10) {
            const y = padding.top + chartHeight - i * yStep;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(padding.left + chartWidth, y);
            ctx.stroke();
        }
    }

    drawDataLines(data, stats) {
        const { ctx, padding, chartWidth, chartHeight } = this;

        let currentX = 0;
        const xScale = chartWidth / stats.totalLength;
        const yScale = chartHeight / stats.maxHeight;

        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            const startX = padding.left + currentX * xScale;
            const endX = padding.left + (currentX + row.length) * xScale;
            const y = padding.top + chartHeight - (row.height * yScale);

            // 計算線條粗細 (1-20像素) - 增加粗細差距
            const lineWidth = Math.max(1, (row.size / 100) * 50);

            // 使用 roundRect 方案 - 圓角但不突出網格
            const rectHeight = lineWidth;
            const rectY = y - rectHeight / 2;
            const radius = lineWidth / 2; // 膠囊效果：圓角半徑 = 矩形高度的一半

            ctx.fillStyle = this.getColorBySize(row.size);

            // 檢查瀏覽器是否支援 roundRect
            if (ctx.roundRect) {
                ctx.beginPath();
                ctx.roundRect(startX, rectY, endX - startX, rectHeight, radius);
                ctx.fill();
            } else {
                // 降級方案：使用傳統矩形
                ctx.fillRect(startX, rectY, endX - startX, rectHeight);
            }

            // 保留原有的 stroke 方案註解，方便切換
            // ctx.strokeStyle = this.getColorBySize(row.size);
            // ctx.lineWidth = lineWidth;
            // ctx.lineCap = 'round';
            // ctx.lineCap = 'butt';
            // ctx.beginPath();
            // ctx.moveTo(startX, y);
            // ctx.lineTo(endX, y);
            // ctx.stroke();

            currentX += row.length;
        }
    }

    getColorBySize(size) {
        // 根據大小值產生顏色漸變
        const ratio = size / 100;
        const r = Math.floor(255 * ratio);
        const g = Math.floor(100 + 155 * (1 - ratio));
        const b = Math.floor(50 + 205 * (1 - ratio));
        return `rgb(${r}, ${g}, ${b})`;
    }

    drawLabels(stats) {
        const { ctx, padding, chartWidth, chartHeight } = this;

        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';

        // X軸標籤
        ctx.fillText('累積長度', padding.left + chartWidth / 2, this.canvas.height - 20);

        // Y軸標籤
        ctx.save();
        ctx.translate(20, padding.top + chartHeight / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('高度', 0, 0);
        ctx.restore();

        // 標題
        ctx.font = '16px Arial';
        ctx.fillText('CSV 數據視覺化圖表', this.canvas.width / 2, 25);

        // 數值標籤
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';

        // X軸數值 - 只顯示5的倍數和頭尾
        const xStep = chartWidth / stats.totalLength;
        for (let i = 0; i <= stats.totalLength; i++) {
            if (i === 0 || i === stats.totalLength || i % 5 === 0) {
                const x = padding.left + i * xStep;
                ctx.fillText(i.toString(), x - 5, padding.top + chartHeight + 15);
            }
        }

        // Y軸數值
        const yStep = chartHeight / stats.maxHeight;
        for (let i = 0; i <= stats.maxHeight; i += 10) {
            const y = padding.top + chartHeight - i * yStep;
            ctx.fillText(i.toString(), padding.left - 25, y + 3);
        }
    }

    drawNoDataMessage() {
        const { ctx } = this;
        ctx.fillStyle = '#666';
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('請上傳 CSV 檔案或載入範例資料', this.canvas.width / 2, this.canvas.height / 2);
    }
}