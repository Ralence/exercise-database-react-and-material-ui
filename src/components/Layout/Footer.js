import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import withWidth from "@material-ui/core/withWidth";
import { WithContext } from "../../context";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: 50
  }
});

const Footer = ({ muscles, onTabSelect, category, width }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
    onTabSelect(event.target.textContent);
  }

  const renderMuscleTabs = muscles.map(muscle => (
    <Tab key={muscle} label={muscle} />
  ));

  return (
    <AppBar position="static" className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        centered={width !== "xs"}
        variant={width === "xs" ? "scrollable" : "standard"}
        scrollButtons="on"
      >
        <Tab key={"all"} label={"all"} />
        {renderMuscleTabs}
      </Tabs>
    </AppBar>
  );
};

export default WithContext(withWidth()(Footer));
