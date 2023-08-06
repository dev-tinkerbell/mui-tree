import React, { useState } from "react";
import { TextField } from "@mui/material";
import { uniq } from "lodash";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TreeFilter = (props) => {
  const { data } = props;
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  const [text, setText] = useState();

  const onFilterKeyUp = (e) => {
    const value = e.target.value;
    const filter = value.trim();

    setText(filter);

    console.log("data", data);
    //   debugger;
    const { resultIds, path, includedIdPath } = getSearchedId(
      [],
      [],
      [],
      data,
      filter
    );
    console.log("resultIds", resultIds, path, uniq(includedIdPath));

    setSelected(resultIds);
    setExpanded(uniq(includedIdPath));

    if (!filter) {
      setExpanded(["root"]);
      return;
    }
  };

  const handleToggle = (event, nodeIds) => {
    let expandedTemp = expanded;
    expandedTemp = nodeIds;
    setExpanded(expandedTemp);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const getSearchedId = (resultIds, path, resultPath, nodes, filter) => {
    const newPath = [...path, nodes.id];
    let includedIdPath = [];

    // 타겟 string
    if (nodes.name.includes(filter)) {
      resultIds = [...resultIds, nodes.id];
      includedIdPath = [...resultPath, ...newPath];
    }

    if (nodes.children && nodes.children.length > 0) {
      for (let index = 0; index < nodes.children.length; index++) {
        const result = getSearchedId(
          resultIds,
          newPath,
          includedIdPath,
          nodes.children[index],
          filter
        );

        resultIds = result.resultIds;
        path = result.path;
        includedIdPath = [...includedIdPath, ...result.includedIdPath];
      }
    }

    return { resultIds, path, includedIdPath };
  };

  const renderTree = (nodes) => {
    if (!nodes || nodes.length === 0) {
      return null;
    }

    return (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  return (
    <div>
      <TextField label="Filter ..." onKeyUp={onFilterKeyUp} />

      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        {renderTree(data)}
      </TreeView>
    </div>
  );
};

export default TreeFilter;
