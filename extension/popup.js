const toggle = document.querySelector("#dark-mode");
const status = document.querySelector("#status");

async function initialize() {
  let enabled;
  try {
    const values = await chrome.storage.local.get("darkMode");
    enabled = values.darkMode === true;
    toggle.checked = enabled;
    toggle.disabled = false;
  } catch {
    status.textContent = "Не удалось прочитать настройку. Откройте меню ещё раз.";
    return;
  }

  toggle.addEventListener("change", async () => {
    toggle.disabled = true;
    status.textContent = "";
    try {
      await chrome.storage.local.set({ darkMode: toggle.checked });
      enabled = toggle.checked;
    } catch {
      toggle.checked = enabled;
      status.textContent = "Не удалось сохранить настройку. Попробуйте ещё раз.";
    } finally {
      toggle.disabled = false;
    }
  });
}

initialize();
