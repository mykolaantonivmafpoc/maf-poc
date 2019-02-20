import React from 'react';
import './DataGrid.scss';
import PropTypes from 'prop-types';

class DataGrid extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      selectedGroupId: PropTypes.string
    }),
    className: PropTypes.string
  }

  static defaultProps = {
    data: {
      selectedGroupId: ''
    },
    className: ''
  };

  constructor(props) {
    super(props);

    this.state = { selectedGroupId: props.data.selectedGroupId };
  }

  HeaderGroups = (props) => {
    let result;

    if (props.groups.length > 1) {
      const headerGroups = props.groups.map((group) => {
        const class_active = props.selectedId === group.id ? 'active' : '';

        return (
          <th
            onClick={this.selectGroup.bind(this)}
            colSpan={group.columns.length}
            className={`last-of-section ${class_active}`}
            data-section={group.id}
            key={group.id}
          >
            {group.name}
          </th>
        );
      });

      result = (
        <tr className="table-header-groups">
          {headerGroups}
        </tr>
      );
    } else {
      result = null;
    }

    return result;
  }

  HeaderColumns = (props) => {
    const headerColumns = [];

    props.groups.forEach((group) => {
      group.columns.forEach((column, id) => {
        const class_lastInGroup = id === group.columns.length - 1 ? 'last-of-section' : '';

        headerColumns.push(
          <th className={class_lastInGroup} key={column.id} data-section={group.id}>
            {column.name}
          </th>
        );
      });
    });

    return (
      <tr className="table-columns-header text-muted">
        {headerColumns}
      </tr>
    );
  }

  BodyRow = (props) => {
    const columns = [];
    const groupColumnsCount = {};
    const { row } = props;
    const onClickAction = props.row.action;
    let resultTemplate;

    if (props.groupsItemsCount) {
      Object.keys(props.groupsItemsCount).forEach((group) => {
        groupColumnsCount[group] = 0;
      });
    }

    Object.keys(props.columnsIdNameMap).forEach((columnId) => {
      const value = row[columnId].value || row[columnId];
      const class_customClass = row[columnId].className || '';

      if (props.groupsItemsCount) {
        const groupId = props.columnsToGroupMap[columnId];
        const numberInGroup = groupColumnsCount[groupId]++;
        const maxCountInGroup = props.groupsItemsCount[groupId];
        const class_lastInGroup = numberInGroup === maxCountInGroup - 1 ? 'last-of-section' : '';
        const title = typeof value === 'object' ? '' : value;

        columns.push(
          <td className={`${class_lastInGroup} ${class_customClass}`} key={columnId} data-section={groupId} >
            <label className="mobile-label">{props.columnsIdNameMap[columnId]}</label>
            <div className="value" title={title}>{value}</div>
          </td>
        );
      } else {
        columns.push(
          <td className={class_customClass} key={columnId}>
            <label className="mobile-label">{props.columnsIdNameMap[columnId]}</label>
            <div className="value">{value}</div>
          </td>
        );
      }
    });

    if (onClickAction) {
      resultTemplate = (
        <tr onClick={onClickAction.bind(row)}>
          {columns}
        </tr>
      );
    } else {
      resultTemplate = (
        <tr>
          {columns}
        </tr>
      );
    }

    return resultTemplate;
  }

  BodyRows = (props) => {
    const rows = [];

    for (let i = 0; i < props.rows.length; i++) {
      rows.push(<this.BodyRow
        row={props.rows[i]}
        groupsItemsCount={props.groupsItemsCount}
        columnsToGroupMap={props.columnsToGroupMap}
        columnsIdNameMap={props.columnsIdNameMap}
        key={i}
      />);
    }

    return (
      <tbody>
        { rows }
      </tbody>
    );
  }

  getDataMeta = (data) => {
    const groupsCount = data.groups.length;
    const dataMeta = {
      groupsItemsCount: {},
      columnsIdNameMap: {},
      columnsToGroupMap: {}
    };

    data.groups.forEach((group) => {
      group.columns.forEach((column) => {
        dataMeta.columnsIdNameMap[column.id] = column.name;

        if (groupsCount > 1) {
          dataMeta.columnsToGroupMap[column.id] = group.id;
        }
      });

      if (groupsCount > 1) {
        dataMeta.groupsItemsCount[group.id] = group.columns.length;
      } else {
        dataMeta.groupsItemsCount = false;
        dataMeta.columnsToGroupMap = false;
      }
    });

    return dataMeta;
  }

  selectGroup(e) {
    const newSection = e.currentTarget.dataset.section;

    this.setState({ selectedGroupId: newSection });
  }

  render() {
    const { data, className } = this.props;
    const { selectedGroupId } = this.state;
    const dataMeta = this.getDataMeta(data);

    return (
      <div className={className}>
        <table className="data-grid table table-hover col-lg" data-selected={selectedGroupId}>
          <thead>
            <this.HeaderGroups groups={data.groups} selectedId={selectedGroupId} />
            <this.HeaderColumns groups={data.groups} />
          </thead>

          <this.BodyRows
            rows={data.rows}
            groupsItemsCount={dataMeta.groupsItemsCount}
            columnsToGroupMap={dataMeta.columnsToGroupMap}
            columnsIdNameMap={dataMeta.columnsIdNameMap}
          />
        </table>
      </div>
    );
  }
}

export default DataGrid;
