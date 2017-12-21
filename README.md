## Limitations

This extension does not support some cases that may produce unexpected behavior,
like printing not exactly the same issues that are listed in YouTrack.

Known limitations are listed below. 

### Search context

Search context is not supported, only search request is taken under consideration
when fetching issues to print. That mean extension always works as if search context
would be "Everything".

See: https://youtrack.jetbrains.com/issue/JT-45011

### Custom issues order

By default issues in YouTrack are sorted by last update time.
Sorting may be changed below search bar, and it changes search request.
This is fully supported.

On the other hand, issues may be reordered manually by dragging them.
Sort order shows then "The results are sorted by: custom order, ...".
Custom order is ignored by the extension and only other sort directives are used.