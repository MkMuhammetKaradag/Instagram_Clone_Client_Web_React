import React from "react";
import { makeStyles, Tab, Tabs, Box } from "@mui/material";
import { BsGrid3X3 } from "react-icons/bs";
import { MdOutlinePersonPin } from "react-icons/md";
import FollowRequest from "../../../componnets/Account/FollowRequest";
import UpdateUser from "../../../componnets/Account/UpdateUser";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AccountPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue);
    newValue == 1 ? console.log(newValue) : console.log(newValue);
    //   ? navigate(`/user/${user?.userNickName}/tagged`)
    //   : navigate(`/user/${user?.userNickName}/posts`);
  };
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 820,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          orientation="vertical"
          variant="scrollable"
          aria-label="icon position tabs example"
          TabIndicatorProps={{
            sx: {
              top: 0,

              backgroundColor: "gray",
            },
          }}
          sx={{
            borderRight: 1,

            marginTop: "-1px",
            // backgroundColor: "purple",
            // "& button:hover": { backgroundColor: "gray" },
            "& button:active": { color: "green" },
            "& button:focus": { color: "gray" },
            "& .MuiTab-root.Mui-selected": {
              color: "black",
            },
            "& .MuiTab-root": {
              color: "#8e8e8e",
            },
            // "& .MuiTab-root.Mui-disabled": {
            //   color: "",
            // },
          }}
        >
          <Tab
            icon={<BsGrid3X3 size={12}></BsGrid3X3>}
            className=" !justify-start "
            iconPosition="start"
            label="bilgiler"
          ></Tab>
          {/* <NavLink to={`/user/${user?.userNickName}/posts`}></NavLink> */}

          <Tab
            icon={<MdOutlinePersonPin size={12}></MdOutlinePersonPin>}
            className=" !justify-start "
            iconPosition="start"
            label="takip istekleri"
          />
          <Tab
            icon={<MdOutlinePersonPin size={12}></MdOutlinePersonPin>}
            className=" !justify-start "
            iconPosition="start"
            label="TAGGED"
          ></Tab>
          <Tab
            icon={<MdOutlinePersonPin size={12}></MdOutlinePersonPin>}
            iconPosition="start"
            className=" !justify-start "
            label="TAGGED"
          ></Tab>
        </Tabs>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FollowRequest />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UpdateUser />
        </TabPanel>
      </Box>
    </div>
  );
};

export default AccountPage;
