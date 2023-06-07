import React from 'react';
import { createListItems, IExampleItem } from '@fluentui/example-data';
import { Link } from '@fluentui/react/lib/Link';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { DetailsList, buildColumns, IColumn } from '@fluentui/react/lib/DetailsList';
import { mergeStyles } from '@fluentui/react/lib/Styling';

export class DetailsListCustomColumnsExample extends React.Component {
  constructor(props) {
    super(props);

    const items = createListItems(500);
    this.state = {
      sortedItems: items,
      columns: this._buildColumns(items),
    };
  }

  render() {
    const { sortedItems, columns } = this.state;

    return (
      <DetailsList
        items={sortedItems}
        setKey="set"
        columns={columns}
        onRenderItemColumn={_renderItemColumn}
        onItemInvoked={this._onItemInvoked}
        onColumnHeaderContextMenu={this._onColumnHeaderContextMenu}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
      />
    );
  }

  _onColumnClick = (event, column) => {
    const { columns } = this.state;
    let { sortedItems } = this.state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    sortedItems = _copyAndSort(sortedItems, column.fieldName, isSortedDescending);

    // Reset the items and columns to match the state.
    this.setState({
      sortedItems: sortedItems,
      columns: columns.map((col) => {
        col.isSorted = col.key === column.key;

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      }),
    });
  };

  _buildColumns(items) {
    const columns = buildColumns(items, false, this._onColumnClick);

    const thumbnailColumn = columns.filter((column) => column.name === 'thumbnail')[0];

    // Special case one column's definition.
    thumbnailColumn.name = '';
    thumbnailColumn.maxWidth = 50;
    thumbnailColumn.ariaLabel = 'Thumbnail';
    thumbnailColumn.onColumnClick = undefined;

    // Indicate that all columns except thumbnail column can be sorted,
    // and only the description colum should disappear at small screen sizes
    columns.forEach((column) => {
      if (column.name) {
        column.showSortIconWhenUnsorted = true;
        column.isCollapsible = column.name === 'description';
      }
    });

    return columns;
  }

  _onColumnHeaderContextMenu(column, ev) {
    alert(`column ${column.key} contextmenu opened.`);
  }

  _onItemInvoked(item, index) {
    alert(`Item ${item.name} at index ${index} has been invoked.`);
  }
}

function _renderItemColumn(item, index, column) {
  const fieldContent = item[column.fieldName];

  switch (column.key) {
    case 'thumbnail':
      return <Image src={fieldContent} width={50} height={50} imageFit={ImageFit.cover} />;

    case 'name':
      return <Link href="#">{fieldContent}</Link>;

    case 'color':
      return (
        <span
          data-selection-disabled={true}
          className={mergeStyles({ color: fieldContent, height: '100%', display: 'block' })}
        >
          {fieldContent}
        </span>
      );

    default:
      return <span>{fieldContent}</span>;
  }
}

function _copyAndSort(items, columnKey, isSortedDescending) {
  const key = columnKey;
  return items.slice(0).sort((a, b) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}