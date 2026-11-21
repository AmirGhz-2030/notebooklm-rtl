# 🚀 Google NotebookLM RTL Chat Chrome Extension
### Pixel-Perfect RTL & Persian Typography Extension for Google NotebookLM (v1.6.0)

![Version](https://img.shields.io/badge/version-1.6.0-blue.svg)
![Manifest](https://img.shields.io/badge/manifest-v3-green.svg)
![Performance](https://img.shields.io/badge/performance-60fps-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)
![Author](https://img.shields.io/badge/developer-AmirGhz--2030-blueviolet.svg)
[![README: English](https://img.shields.io/badge/README-English-brightgreen.svg)](README.md)
[![README: Persian](https://img.shields.io/badge/README-Persian-orange.svg)](README.fa.md)

> 🌐 **Read this in other languages:** **English** | [فارسی (Persian)](README.fa.md)

A fast, lightweight, and precision-tuned Chrome Extension (Manifest V3) for Right-to-Left (**RTL**) alignment, clean list indentation, and improved Persian typography inside **[Google NotebookLM](https://notebooklm.google.com)**.

---

## ✨ Key Features

- 🎯 **Chat-Only Scoped RTL**:
  Applies RTL direction strictly to chat messages and the chat input box, leaving the top Header, Studio panel, and Sources panel completely untouched in their native layout.

- 📐 **Pixel-Perfect Layout & Margins**:
  Resets browser default LTR paddings and aligns nested lists and bullet points (`•` and `o`) cleanly with Google NotebookLM's native chat container spacing.

- 🎨 **Preserves Icons & UI Graphics**:
  Explicitly excludes icon elements (`mat-icon`, `svg`, `material-symbols-outlined`) from direction or font overrides to preserve original icon geometry and alignment.

- ⚡ **60FPS Smooth Scrolling Performance**:
  Uses `WeakMap` caching and a 150 ms debounce for DOM observation—preventing layout thrashing, minimizing memory overhead, and keeping scrolling completely fluid.

- 🧠 **Smart Automatic Direction Detection (Auto RTL)**:
  Automatically detects Persian and Arabic characters so RTL text renders right-to-left while English text remains cleanly left-to-right.

- 🔤 **Persian Typography (Vazirmatn Font)**:
  Optional toggle to apply the crisp Vazirmatn Persian font for improved readability of AI responses.

- 💻 **Code Block Preservation**:
  Programming code blocks (`pre` and `code`) and math expressions stay strictly left-to-right (LTR) with monospace styling.

- ⚡ **Floating Status Badge**:
  Displays a compact floating status badge in the corner of the page allowing one-click enable/disable toggling.

---

## 🛠️ Chrome Installation Guide

1. Clone or download this repository:
   ```bash
   git clone https://github.com/AmirGhz-2030/notebooklm-rtl.git
   ```
2. Open Google Chrome and navigate to:
   ```text
   chrome://extensions
   ```
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked**.
5. Select the cloned project directory.
6. The extension is now active and ready to use on [Google NotebookLM](https://notebooklm.google.com)!

---

## 💻 Project Structure

```text
notebooklm-rtl/
├── manifest.json       # Chrome Extension configuration (Manifest V3)
├── content.js          # Core text detection, DOM observer, and WeakMap caching
├── content.css         # RTL layout and typography stylesheets
├── popup.html          # Extension settings popup UI
├── popup.js            # Settings state management via chrome.storage
├── popup.css           # Modern dark popup styling
├── LICENSE             # MIT License
├── README.md           # Documentation (English)
├── README.fa.md        # Documentation (Persian)
└── icons/              # Extension icons (16x16, 48x48, 128x128)
```
