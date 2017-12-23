# YouTrack Issue Cards Printer

Chrome extension that allows to print issues from YouTrack as cards
for physical scrum board.

If you find this extension useful,
fill free to support me by PayPal:
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZPT5PRWA9V9BW)

## How to use

1. Install extension.
2. Go to Your YouTrack issues list - [https://your-youtrack-domain/issues](https://your-youtrack-domain/issues)
3. Filter issues you want to print.
4. Click extension icon or ![](youtrack-print-button.png) button above issues list
to print cards.

## Limitations

This extension does not support some cases that may produce unexpected behavior,
like printing not exactly the same issues that are listed in YouTrack.

Known limitations are listed below. 

### Custom issues order

By default issues in YouTrack are sorted by last update time.
Sorting may be changed below search bar, and it changes search request.
This is fully supported.

On the other hand, issues may be reordered manually by dragging them.
Sort order shows then `The results are sorted by: custom order, ...`.
Custom order is ignored by the extension and only other sort directives are used.
