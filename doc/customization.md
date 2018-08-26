# Customizing cards

Both layout and style of the cards can be customized.

To customize cards open extension options and enable "use custom card layout".

## Card template

Card template is the HTML code that will be used as card content.

Use `data-field` attribute to link template element with data from YouTrack issue.
Content is set inside child `span` element of node with `data-field` attribute.

For example, for the code:

```html
<div data-field="summary"><span></span></div>
```

and issue summary (title) "Printing test"
there will be rendered:

```html
<div><span>Printing test</span></div>
```

### Pre and after text

Additional content may be given in the element with `data-field`,
outside `span` node. For example:

```html
<div data-field="summary">Summary: <span></span>!</div>
```

### Fields

Fields available for `data-field` attribute are taken from the YouTrack API
and depend on issue's state and it's project configuration.

Field names are the same names as in project configuration fields,
converted to camelCase. Example common fields:
- `summary`,
- `description`,
- `priority`,
- `projectShortName`,
- `reporterFullName`,
- `reporterName`,
- `spentTime`,
- `state`,
- `summary`,
- `type`,
- `votes`.

Issues can have more custom fields, like `sprints`, `storyPoints`, `subsystem`
and so on.

Additionally, there are added fields:
- `id` with full issue ID (for example YT-123),
- for links between issues in a form of `linkXxxYyy`,
where `Xxx` is the link's type and `Yyy` is the link's role.
Example fields for default YouTrack link:
  - `linkSubtaskSubtaskOf`,
  - `linkSubtaskParentFor`,
  - `linkRelatesRelatesTo`,
  - `linkProblemIncidentCauses`,
  - `linkProblemIncidentIsCausedBy`.

If field has more then one value, the first one provided by YouTrack API
will be used.

When creating custom template, enable debug mode in extension options.
This will allow you to open issue cards as page instead of printing them
and investigate issues data in Chrome Developer Console.

By default if the issue doesn't contain field given in `data-field`,
the element will not be shown.
This may be changed by styling elements and overriding `display: none` property
with `!important` attribute.

## Card styles

Provided card styles as CSS code are added to
[default styles](../resources/css/card.css)
to format cards.

When styling, the unit used should be `cm`,
as it's a real-world unit used for printing.

Single card is a square with a side length of 8.8 cm
and inner padding of 0.5 cm.
This leaves the space of 7.8 x 7.8 cm for the card content.

All top level card elements have by default `position: absolute`.
