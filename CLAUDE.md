# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

這是一個 CSV 數據視覺化工具，使用 HTML5 Canvas 建立自訂圖表。該應用程式是靜態網頁應用程式，允許使用者上傳 CSV 檔案或使用範例資料來產生視覺化圖表。

## 架構設計

應用程式採用模組化的 JavaScript 類別架構：

- **ChartApp** (`js/main.js`)：主要應用程式控制器，負責協調檔案處理、數據處理和 UI 更新
- **CSVParser** (`js/csvParser.js`)：處理 CSV 解析和範例數據生成
- **DataValidator** (`js/dataValidator.js`)：驗證數據範圍並提供統計分析
- **ChartDrawer** (`js/chartDrawer.js`)：在 HTML5 Canvas 上渲染圖表，包含自訂視覺化邏輯

## 數據格式

應用程式預期 CSV 數據包含 4 個欄位：
- 欄位 1：姓名 (string) - 保留欄位，不參與視覺化
- 欄位 2：長度 (1-4)
- 欄位 3：高度 (1-100)
- 欄位 4：大小 (1-127)

數據視覺化為彩色線段：
- X 軸代表累積長度
- Y 軸代表高度
- 線條粗細代表大小
- 顏色漸變代表大小（大值為紅色，小值為藍綠色）

## 開發流程

這是一個靜態網站，無需建置過程。可直接編輯檔案並在瀏覽器中檢視。

**本地開發：**
- 直接在瀏覽器中開啟 `index.html`
- 或使用任何靜態檔案伺服器（如 `python -m http.server`）

**檔案結構：**
- `index.html`：主要進入點，包含 UI 版面配置
- `css/style.css`：介面樣式
- `js/`：所有 JavaScript 模組（在 HTML 中按特定順序載入）
- `sample_data.csv`：測試用範例 CSV 檔案（包含姓名欄位）

**CSV 格式要求：**
- 支援標準 CSV 格式
- 第一欄為姓名，但不參與視覺化計算
- 自動跳過姓名欄位，僅處理數值欄位
- 需包含標題行：姓名,長度,高度,大小

**測試方法：**
- 載入應用程式並使用「載入範例資料」按鈕測試
- 測試使用正確格式的 CSV 檔案上傳功能
- 驗證數據驗證功能可正確處理無效數據
- 測試 PNG 和 SVG 匯出功能

## 部署

此專案部署至 GitHub Pages。`index.html` 檔案作為進入點，所有資源使用相對路徑以確保 GitHub Pages 相容性。