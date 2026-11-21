/**
 * Google NotebookLM RTL Chat Script (v1.6.0 - Perfect RTL Layout Edition)
 * Zeroes out LTR padding-left and mirrors nested list indentations to the right.
 */

(function () {
  'use strict';

  if (window.__NLM_RTL_INJECTED__) return;
  window.__NLM_RTL_INJECTED__ = true;

  let settings = {
    enabled: true,
    mode: 'auto',
    font: 'vazirmatn',
    targetScope: 'chat_only'
  };

  const RTL_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/;

  const processedCache = new WeakMap();

  const RTL_CSS_TEXT = `
    .nlm-chat-rtl {
      direction: rtl !important;
      text-align: right !important;
      unicode-bidi: plaintext !important;
    }
    .nlm-chat-rtl p,
    .nlm-chat-rtl blockquote,
    .nlm-chat-rtl h1, .nlm-chat-rtl h2, .nlm-chat-rtl h3,
    .nlm-chat-rtl h4, .nlm-chat-rtl h5, .nlm-chat-rtl h6 {
      direction: rtl !important;
      text-align: right !important;
      unicode-bidi: plaintext !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    ul.nlm-chat-rtl, ol.nlm-chat-rtl,
    .nlm-chat-rtl ul, .nlm-chat-rtl ol {
      direction: rtl !important;
      text-align: right !important;
      padding-left: 0 !important;
      padding-right: 1.5rem !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    .nlm-chat-rtl ul ul, .nlm-chat-rtl ol ol,
    .nlm-chat-rtl ul ol, .nlm-chat-rtl ol ul {
      padding-left: 0 !important;
      padding-right: 1.2rem !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    li.nlm-chat-rtl, .nlm-chat-rtl li {
      direction: rtl !important;
      text-align: right !important;
      unicode-bidi: plaintext !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    pre, code, kbd, samp, .code-block, [class*="code"], .katex, .math-display {
      direction: ltr !important;
      text-align: left !important;
      unicode-bidi: normal !important;
    }
  `;

  function injectStylesIntoRoot(root) {
    if (!root) return;
    try {
      if (!root.querySelector('#nlm-rtl-style')) {
        const style = document.createElement('style');
        style.id = 'nlm-rtl-style';
        style.textContent = RTL_CSS_TEXT;
        (root.head || root).appendChild(style);
      }
    } catch (e) {}
  }

  function updateFloatingBadge() {
    let badge = document.getElementById('nlm-rtl-floating-badge');
    if (!settings.enabled) {
      if (badge) badge.style.display = 'none';
      return;
    }

    if (!badge && document.body) {
      badge = document.createElement('div');
      badge.id = 'nlm-rtl-floating-badge';
      badge.title = 'راست‌چین چت NotebookLM';
      badge.addEventListener('click', () => {
        settings.enabled = !settings.enabled;
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
          chrome.storage.sync.set({ enabled: settings.enabled });
        }
        applySettingsToBody();
        processDOM();
      });
      document.body.appendChild(badge);
    }

    if (badge) {
      badge.style.display = 'flex';
      if (settings.enabled) {
        badge.classList.remove('disabled');
        badge.innerHTML = '<span class="dot"></span> ⚡ راست‌چین چت: فعال';
      } else {
        badge.classList.add('disabled');
        badge.innerHTML = '<span class="dot"></span> ⚡ راست‌چین چت: غیرفعال';
      }
    }
  }

  function loadSettings() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.get(settings, (items) => {
          if (items) settings = { ...settings, ...items };
          applySettingsToBody();
          processDOM();
        });
      } else {
        applySettingsToBody();
        processDOM();
      }
    } catch (e) {
      applySettingsToBody();
      processDOM();
    }
  }

  try {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync') {
          for (let key in changes) {
            settings[key] = changes[key].newValue;
          }
          applySettingsToBody();
          processDOM();
        }
      });
    }
  } catch (e) {}

  try {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'SETTINGS_UPDATED') {
          settings = { ...settings, ...request.settings };
          applySettingsToBody();
          processDOM();
          if (sendResponse) sendResponse({ status: 'ok' });
        }
      });
    }
  } catch (e) {}

  function applySettingsToBody() {
    updateFloatingBadge();
  }

  function hasRTLText(text) {
    if (!text || typeof text !== 'string') return false;
    return RTL_REGEX.test(text);
  }

  function shouldSkipElement(el) {
    if (!el || !el.tagName) return true;
    const tag = el.tagName.toLowerCase();

    if ([
      'pre', 'code', 'script', 'style', 'noscript', 'svg', 'math', 'path',
      'button', 'a', 'mat-icon', 'img'
    ].includes(tag)) {
      return true;
    }

    if (el.classList && (
      el.classList.contains('material-symbols-outlined') ||
      el.classList.contains('material-icons')
    )) {
      return true;
    }

    if (el.closest && (el.closest('pre') || el.closest('code') || el.closest('.katex') || el.closest('button'))) {
      return true;
    }

    return false;
  }

  function processSingleElement(el) {
    if (shouldSkipElement(el)) return;

    const text = el.innerText || el.value || el.textContent || '';

    const cacheKey = `${settings.mode}_${settings.enabled}_${settings.font}_${text.length}_${text.slice(0, 20)}`;
    if (processedCache.get(el) === cacheKey) {
      return;
    }
    processedCache.set(el, cacheKey);

    if (!settings.enabled) {
      el.classList.remove('nlm-chat-rtl');
      el.removeAttribute('dir');
      el.removeAttribute('data-nlm-dir');
      el.style.removeProperty('direction');
      el.style.removeProperty('text-align');
      return;
    }

    // Input & Textarea
    const tag = el.tagName.toLowerCase();
    if (tag === 'textarea' || tag === 'input' || el.isContentEditable) {
      if (settings.mode === 'force_rtl' || (settings.mode === 'auto' && hasRTLText(text))) {
        el.setAttribute('dir', 'rtl');
        el.style.setProperty('direction', 'rtl', 'important');
        el.style.setProperty('text-align', 'right', 'important');
        if (settings.font === 'vazirmatn') {
          el.style.setProperty('font-family', "'Vazirmatn', sans-serif", 'important');
        }
      }
      return;
    }

    // Text & Block elements
    const isRTL = hasRTLText(text);

    if (settings.mode === 'force_rtl' || (settings.mode === 'auto' && isRTL)) {
      el.setAttribute('dir', 'rtl');
      el.setAttribute('data-nlm-dir', 'rtl');
      el.classList.add('nlm-chat-rtl');
      el.style.setProperty('direction', 'rtl', 'important');
      el.style.setProperty('text-align', 'right', 'important');

      if (settings.font === 'vazirmatn') {
        el.style.setProperty('font-family', "'Vazirmatn', sans-serif", 'important');
      }

      if (tag === 'li' || tag === 'ul' || tag === 'ol') {
        const parentList = tag === 'li' ? el.closest('ul, ol') : el;
        if (parentList) {
          parentList.setAttribute('dir', 'rtl');
          parentList.setAttribute('data-nlm-dir', 'rtl');
          parentList.classList.add('nlm-chat-rtl');
          parentList.style.setProperty('direction', 'rtl', 'important');
          parentList.style.setProperty('text-align', 'right', 'important');
          parentList.style.setProperty('padding-left', '0', 'important');
          parentList.style.setProperty('padding-right', '1.5rem', 'important');
          parentList.style.setProperty('margin-left', '0', 'important');
          parentList.style.setProperty('margin-right', '0', 'important');
        }
      }
    }
  }

  function processDOM() {
    if (!document.body || !settings.enabled) return;
    injectStylesIntoRoot(document);

    const selectors = [
      '[class*="chat"] p', '[class*="chat"] li', '[class*="chat"] ul', '[class*="chat"] ol',
      '[class*="chat"] textarea', '[class*="chat"] input',
      '[class*="message"] p', '[class*="message"] li', '[class*="message"] ul', '[class*="message"] ol',
      'textarea', '[role="textbox"]',
      '.formatted-response p', '.formatted-response li',
      '.message-content p', '.message-content li'
    ].join(',');

    const elements = document.querySelectorAll(selectors);
    for (let i = 0; i < elements.length; i++) {
      processSingleElement(elements[i]);
    }
  }

  let debounceTimer = null;
  function debouncedProcessDOM() {
    if (debounceTimer) return;
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      processDOM();
    }, 150);
  }

  function initObserver() {
    const observer = new MutationObserver((mutations) => {
      let shouldRun = false;
      for (let i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length > 0 || mutations[i].type === 'characterData') {
          shouldRun = true;
          break;
        }
      }
      if (shouldRun) {
        debouncedProcessDOM();
      }
    });

    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  function init() {
    loadSettings();

    ['input', 'keyup', 'change', 'focus'].forEach((evtType) => {
      document.addEventListener(evtType, (e) => {
        if (e.target && (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT' || e.target.isContentEditable)) {
          processSingleElement(e.target);
        }
      }, true);
    });

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        processDOM();
        initObserver();
      });
    } else {
      processDOM();
      initObserver();
    }
  }

  init();
})();
