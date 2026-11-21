# 🚀 Google NotebookLM RTL Chat Chrome Extension
### افزونه راست‌چین‌سازی متون و چت گوگل نوت‌بوک (نسخه Pixel-Perfect v1.6.0)

![Version](https://img.shields.io/badge/version-1.6.0-blue.svg)
![Manifest](https://img.shields.io/badge/manifest-v3-green.svg)
![Performance](https://img.shields.io/badge/performance-60fps-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)
![Author](https://img.shields.io/badge/developer-AmirGhz--2030-blueviolet.svg)
[![README: English](https://img.shields.io/badge/README-English-brightgreen.svg)](README.md)
[![README: Persian](https://img.shields.io/badge/README-Persian-orange.svg)](README.fa.md)

> 🌐 **زبان مستندات:** [English](README.md) | **فارسی**

یک افزونه فوق‌العاده سریع، بهینه‌سازی‌شده و دقیق برای مرورگر کروم (Manifest V3) جهت راست‌چین‌سازی (**RTL**)، تنظیم دقیق فواصل لیست‌ها و بهبود تایپوگرافی متون فارسی در **[Google NotebookLM](https://notebooklm.google.com)**.

---

## ✨ ویژگی‌های برجسته (Features)

- 🎯 **راست‌چین‌سازی اختصاصی بخش چت (Chat-Only Scoped)**:
  راست‌چین‌سازی تنها بر روی پیام‌ها و فیلد ورودی بخش چت اعمال می‌شود و چیدمان نوار بالا (Header)، پنل استودیو (Studio) و پنل منابع (Sources) کاملاً دست‌نخورده و استاندارد باقی می‌ماند.

- 📐 **چیدمان و مارجین‌های استاندارد (Pixel-Perfect Layout)**:
  صفر کردن پدینگ‌های LTR مرورگر و تنظیم دقیق تورفتگی زیرلیست‌ها و بالت‌ها (`•` و `o`) منطبق با پدینگ استاندارد کادر چت گوگل نوت‌بوک.

- 🎨 **حفظ کامل ابعاد آیکون‌ها و المان‌های گرافیکی**:
  استثنا کردن تمامی تگ‌های آیکون (`mat-icon`, `svg`, `material-symbols-outlined`) از هرگونه تغییر جهت یا فونت جهت حفظ ابعاد و ظاهر اورجینال سایت.

- ⚡ **عملکرد فوق سریع با نرخ ۶۰ فریم بر ثانیه (60FPS Smooth Scrolling)**:
  استفاده از سیستم کشینگ هوشمند `WeakMap` و Debounce ۱۵۰ میلی‌ثانیه‌ای؛ جلوگیری از کندی صفحه، کاهش مصرف حافظه و روان بودن کامل اسکرول نوت‌بوک.

- 🧠 **تشخیص هوشمند متون (Auto RTL)**:
  تشخیص خودکار کاراکترهای فارسی و عربی؛ متون فارسی به صورت راست‌چین و متون انگلیسی به صورت چپ‌چین به نمایش در می‌آیند.

- 🔤 **فونت فارسی زیبا (Vazirmatn)**:
  امکان فعال‌سازی فونت استاندارد متون فارسی (وزیرمتن) برای خوانایی بهتر پاسخ‌های هوش مصنوعی.

- 💻 **حفظ چیدمان بلوک‌های کد (Code Blocks)**:
  بلوک‌های برنامه‌نویسی (`pre` و `code`) و فرمول‌های ریاضی به صورت چپ‌چین (LTR) و با فونت Monospace باقی می‌مانند.

- ⚡ **نشانگر شناور روی صفحه (Floating Status Badge)**:
  نمایش یک نشانگر هوشمند در گوشه پایین صفحه با قابلیت خاموش/روشن کردن سریع افزونه با یک کلیک.

---

## 🛠️ راهنمای نصب در مرورگر کروم (Installation)

1. مخزن پروژه را دانلود کنید یا با دستور زیر آن را کلون کنید:
   ```bash
   git clone https://github.com/AmirGhz-2030/notebooklm-rtl.git
   ```
2. مرورگر Google Chrome را باز کرده و به آدرس زیر بروید:
   ```text
   chrome://extensions
   ```
3. گزینه **Developer mode (حالت توسعه‌دهنده)** را در گوشه بالا سمت راست فعال کنید.
4. روی دکمه **Load unpacked** کلیک کنید.
5. پوشه پروژه را انتخاب کنید.
6. افزونه فعال شده و آماده استفاده در [Google NotebookLM](https://notebooklm.google.com) می‌باشد!

---

## 💻 ساختار فایل‌های پروژه (Project Structure)

```text
notebooklm-rtl/
├── manifest.json       # کانفیگ اصلی افزونه مرورگر (Manifest V3)
├── content.js          # اسکریپت اصلی پردازش متون، پایش DOM و سیستم کشینگ
├── content.css         # استایل‌های CSS راست‌چین‌سازی و تایپوگرافی
├── popup.html          # پنجره تنظیمات افزونه (با لینک گیت‌هاب توسعه‌دهنده)
├── popup.js            # مدیریت تنظیمات و ذخیره در chrome.storage
├── popup.css           # استایل مدرن تاریک پاپ‌آپ
├── LICENSE             # لایسنس MIT
├── README.md           # مستندات پروژه (انگلیسی)
├── README.fa.md        # مستندات پروژه (فارسی)
└── icons/              # آیکون‌های افزونه (16x16, 48x48, 128x128)
```
