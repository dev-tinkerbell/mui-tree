import React, { useState } from "react";
import { TextField } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TreeFilter = ({ data }) => {
  const [expandedNodes, setExpandedNodes] = useState(["0"]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);

  const onFilterKeyUp = (e) => {
    const value = e.target.value;
    const filteredText = value.trim().toLowerCase();

    const { resultIds, resultPathIds } = getSearchedId(data, filteredText);

    if (resultPathIds.length === 0) {
      setMatchedIds([]);
      console.log("No matching nodes found.");
      return;
    }

    if (!filteredText) {
      setMatchedIds([]);
      setExpandedNodes(["0"]);
      return;
    }

    setMatchedIds(resultIds);
    setExpandedNodes(filterUniq(resultPathIds));
  };

  const filterUniq = (arr) => {
    const uniqueValues = [];
    for (const value of arr) {
      if (!uniqueValues.includes(value)) {
        uniqueValues.push(value);
      }
    }
    return uniqueValues;
  };

  const handleToggle = (event, nodeIds) => {
    setExpandedNodes(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelectedNodes(nodeIds);
  };

  const getSearchedId = (nodes, filteredText) => {
    const resultIds = [];
    const resultPathIds = [];

    const searchNodes = (currentNode, path) => {
      path = [...path, currentNode.id];

      if (currentNode.name.toLowerCase().includes(filteredText)) {
        resultIds.push(currentNode.id);
        resultPathIds.push(...path);
      }

      if (currentNode.children && currentNode.children.length > 0) {
        for (const childNode of currentNode.children) {
          searchNodes(childNode, path);
        }
      }
    };

    searchNodes(nodes, []);
    return { resultIds, resultPathIds };
  };

  const renderTree = (nodes) => {
    if (!nodes || nodes.length === 0) {
      return null;
    }

    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name}
        className={matchedIds.some((node) => node === nodes.id) ? "active" : ""}
      >
        {Array.isArray(nodes.children) &&
          nodes.children.map((node) => renderTree(node))}
      </TreeItem>
    );
  };

  return (
    <div>
      <TextField label="Filter ..." onKeyUp={onFilterKeyUp} />

      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expandedNodes}
        selected={selectedNodes}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        {renderTree(data)}
      </TreeView>
    </div>
  );
};

export default TreeFilter;
