(() => {
  const setting = "darkMode";
  let receivedChange = false;

  function applyTheme(enabled) {
    document.documentElement.toggleAttribute("data-simplex-dark", enabled === true);
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && Object.hasOwn(changes, setting)) {
      receivedChange = true;
      applyTheme(changes[setting].newValue);
    }
  });

  chrome.storage.local.get(setting).then((values) => {
    if (!receivedChange) {
      applyTheme(values[setting]);
    }
  }).catch(console.error);
})();
