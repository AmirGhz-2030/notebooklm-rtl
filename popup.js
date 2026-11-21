/**
 * Popup Script - NotebookLM RTL Extension (v1.4.0)
 * Handles UI interactions, settings sync with chrome.storage, and live tab messaging.
 */

document.addEventListener('DOMContentLoaded', () => {
  const masterEnable = document.getElementById('master-enable');
  const mainSettings = document.getElementById('main-settings');
  const modeRadios = document.getElementsByName('mode');
  const targetScope = document.getElementById('target-scope');
  const fontVazirmatn = document.getElementById('font-vazirmatn');
  const statusBadge = document.getElementById('status-badge');
  const statusText = document.getElementById('status-text');

  const defaultSettings = {
    enabled: true,
    mode: 'auto',
    font: 'vazirmatn',
    targetScope: 'chat_only'
  };

  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get(defaultSettings, (settings) => {
      updateUI(settings);
    });
  }

  function updateUI(settings) {
    masterEnable.checked = settings.enabled;
    fontVazirmatn.checked = settings.font === 'vazirmatn';
    targetScope.value = settings.targetScope || 'chat_only';

    for (let radio of modeRadios) {
      if (radio.value === settings.mode) {
        radio.checked = true;
      }
    }

    applyDisabledState(!settings.enabled);
  }

  function applyDisabledState(isDisabled) {
    if (isDisabled) {
      mainSettings.classList.add('main-disabled');
      statusBadge.classList.remove('active');
      statusText.textContent = 'افزونه غیرفعال است';
    } else {
      mainSettings.classList.remove('main-disabled');
      statusBadge.classList.add('active');
      statusText.textContent = 'فعال در چت NotebookLM';
    }
  }

  function getSelectedSettings() {
    let selectedMode = 'auto';
    for (let radio of modeRadios) {
      if (radio.checked) {
        selectedMode = radio.value;
        break;
      }
    }

    return {
      enabled: masterEnable.checked,
      mode: selectedMode,
      font: fontVazirmatn.checked ? 'vazirmatn' : 'default',
      targetScope: targetScope.value
    };
  }

  function saveAndBroadcast() {
    const settings = getSelectedSettings();
    applyDisabledState(!settings.enabled);

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set(settings, () => {
        chrome.tabs.query({ url: ['*://notebooklm.google.com/*', '*://notebooklm.google/*'] }, (tabs) => {
          if (tabs && tabs.length > 0) {
            tabs.forEach((tab) => {
              chrome.tabs.sendMessage(tab.id, {
                action: 'SETTINGS_UPDATED',
                settings: settings
              }).catch(() => {});
            });
          }
        });
      });
    }
  }

  masterEnable.addEventListener('change', saveAndBroadcast);
  fontVazirmatn.addEventListener('change', saveAndBroadcast);
  targetScope.addEventListener('change', saveAndBroadcast);

  for (let radio of modeRadios) {
    radio.addEventListener('change', saveAndBroadcast);
  }
});
