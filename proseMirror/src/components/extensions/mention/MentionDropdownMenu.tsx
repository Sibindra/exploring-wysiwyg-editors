import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { NodeViewWrapper } from "@tiptap/react";

const MentionDropdownMenu: React.FC = () => {
  const mentions = ["@john", "@jane", "@doe"];

  const items: MenuProps["items"] = mentions.map((mention, index) => ({
    key: index,
    label: <>{mention}</>,
  }));

  return (
    <NodeViewWrapper className="mention-node">
      <Dropdown menu={{ items }} open>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
          </Space>
        </a>
      </Dropdown>
    </NodeViewWrapper>
  );
};

export default MentionDropdownMenu;
