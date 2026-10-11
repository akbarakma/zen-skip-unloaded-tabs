# Skip Unloaded Tabs

A [Sine](https://github.com/CosmoCreeper/Sine) mod for Zen Browser. After you close or unload a tab, Zen switches to a loaded tab. It never wakes up a tab you unloaded.

## The problem

When you close or unload the active tab, Zen has to pick another tab to show. Stock Zen only skips tabs that are both pinned and unloaded. A regular unloaded tab is still a valid pick, so Zen selects it, it loads again, and you unload it a second time.

The setting "When closing a tab, switch to the most recently used tab instead of the next tab" does not help. It changes the order Zen picks in and ignores whether a tab is loaded. A tab you visited and then unloaded is often the most recent one, so it wins.

Other people have asked for this in Zen discussions [#13919](https://github.com/zen-browser/desktop/discussions/13919) and [#7475](https://github.com/zen-browser/desktop/discussions/7475).

## What changes

| You do this | Stock Zen picks | With this mod |
|---|---|---|
| Close a tab, next tab is unloaded | the unloaded tab | the nearest loaded tab |
| Close a tab, most recent tab is unloaded | the unloaded tab | the most recent loaded tab |
| Cmd/Ctrl+W on a pinned tab (unload and switch) | the unloaded neighbour | a loaded tab |
| Close a tab when every other tab is unloaded | an unloaded tab | Zen's empty tab |

Your "most recently used" setting still decides which loaded tab you land on.

## Install

Install it from the Sine marketplace inside Zen's settings. It can be turned on and off from the Sine mod list without a restart.

## How it works

Every close and unload path in Zen calls `gBrowser._findTabToBlurTo` to choose the next tab. The mod wraps that function and adds all unloaded tabs to its exclude list. If that leaves nothing to pick, Zen falls back to its empty tab. If Zen has no empty tab either, the mod returns Zen's original pick.

## Limits

- Tested on Zen 1.23.2b (Firefox 157), macOS.
- Not tested with split view, Glance or tab folders.
- `_findTabToBlurTo` is an internal function. If a future Zen renames it, the mod does nothing and Zen behaves as stock. Open an issue if that happens.

## How this was made

I ran into this problem on my daily browser, traced it with Claude through Zen's source, and chose the approach. Claude wrote the code. I tested it on my own setup.

## License

MIT
