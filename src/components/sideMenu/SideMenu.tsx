import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import React, { Fragment, useState } from "react";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

export interface IMenuItem {
  text: string;
  to: string;
  children?: IMenuItem[];
}

const SideMenu = ({ depth = 0, items = [] as IMenuItem[], ...rest }) => {
  const [collapsedItems, setCollapsedItems] = useState({} as any);

  const toggleCollapsedItems = (key: string) => {
    setCollapsedItems((previousState: any) => {
      const previousItemState = previousState[key] || false;

      return {
        ...previousState,
        [key]: !previousItemState
      };
    });
  };

  return (
    <List {...rest}>
      {(items as IMenuItem[]).map((item, index) => {
        let to = {};

        if (!item.children) {
          to = {
            component: Link,
            to: item.to
          };
        }

        return (
          <Fragment key={index + "-" + item.text + "-" + item.to + "-" + depth}>
            <ListItem
              button
              onClick={() => toggleCollapsedItems(item.to)}
              style={{ paddingLeft: 10 * (depth + 1) + "px" }}
              {...to}
            >
              {/* <ListItemIcon>
				{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
			  </ListItemIcon> */}
              <ListItemText primary={item.text} />
              {item.children &&
                (collapsedItems[item.to] ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {item.children && (
              <Collapse
                in={collapsedItems[item.to]}
                timeout="auto"
                unmountOnExit
              >
                <SideMenu
                  depth={depth + 1}
                  items={item.children}
                  disablePadding
                />
              </Collapse>
            )}
          </Fragment>
        );
      })}
    </List>
  );
};

export default SideMenu;
