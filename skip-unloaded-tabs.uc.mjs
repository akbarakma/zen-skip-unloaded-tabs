const tabbrowser = window.gBrowser;
const findTabToBlurTo = tabbrowser?._findTabToBlurTo;

if (typeof findTabToBlurTo === "function") {
  tabbrowser._findTabToBlurTo = function (aTab, aExcludeTabs = []) {
    const unloadedTabs = this.tabs.filter(
      tab => tab.hasAttribute("pending") && !tab.hasAttribute("zen-empty-tab")
    );
    // Fall back to Zen's own pick: removeTab assigns this result to selectedTab and cannot take null.
    return (
      findTabToBlurTo.call(this, aTab, [...aExcludeTabs, ...unloadedTabs]) ??
      findTabToBlurTo.call(this, aTab, aExcludeTabs)
    );
  };

  window.addUnloadListener?.(() => {
    delete tabbrowser._findTabToBlurTo;
  });
}
