import Badge, { badgeClasses } from "@mui/joy/Badge";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  useColorScheme,
} from "@mui/joy";

import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import CircularProgress from "@mui/joy/CircularProgress";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import ListSubheader from "@mui/joy/ListSubheader";
import Option from "@mui/joy/Option";
import { Outlet } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PieChart from "@mui/icons-material/PieChart";
import Select from "@mui/joy/Select";
import Sheet from "@mui/joy/Sheet";
import SmsIcon from "@mui/icons-material/Sms";
import Typography from "@mui/joy/Typography";
import { useAuth } from "../services/firebase.config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const containerStyle = {
  display: "flex",
  overflow: "auto",
  height: "100%",
};
export default function Sidebar() {
  const { mode, setMode } = useColorScheme();
  const [user] = useAuth();
  const navigate = useNavigate();
  return (
    <Box sx={containerStyle}>
      <Sheet
        variant="soft"
        color="neutral"
        invertedColors
        sx={(theme) => ({
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          "& button": {
            borderRadius: "50%",
            padding: 0,
            "&:hover": {
              boxShadow: theme.shadow.md,
            },
          },
        })}>
        <Badge badgeContent="7" size="sm">
          <IconButton onClick={() => navigate("/login")}>
            <Avatar src={user?.photoURL} alt={user?.displayName} />
          </IconButton>
        </Badge>
        <IconButton
          variant="plain"
          size="sm"
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          sx={{ mt: "auto", height: "40px" }}>
          <ColorLensRoundedIcon fontSize="small" />
        </IconButton>
      </Sheet>
      <Sheet
        invertedColors
        sx={{
          p: 2,
          // backgroundColor: "transparent",
        }}>
        <Select
          variant="outlined"
          defaultValue="1"
          size="sm"
          startDecorator={
            <Sheet
              variant="solid"
              sx={{
                p: 0.75,
                borderRadius: "50%",
                lineHeight: 0,
                alignSelf: "center",
              }}>
              <BubbleChartIcon sx={{ m: 0 }} />
            </Sheet>
          }
          sx={{ py: 1 }}>
          <Option value="1">TodoSet1</Option>
          <Option value="2">TodoSet2</Option>
        </Select>
        <List
          sx={{
            "--ListItem-radius": "8px",
            "--List-gap": "4px",
            flexGrow: 0,
            minWidth: 200,
          }}>
          <ListItemButton
            selected
            variant="soft"
            onClick={() => navigate("/")}>
            <ListItemDecorator>
              <SmsIcon />
            </ListItemDecorator>
            Todos
            <Chip
              data-skip-inverted-colors
              size="sm"
              color="neutral"
              variant="soft"
              sx={{ ml: "auto" }}>
              5
            </Chip>
          </ListItemButton>
          <ListItemButton>
            <ListItemDecorator>
              <PersonIcon />
            </ListItemDecorator>
            Tags
          </ListItemButton>
        </List>
        <Card
          variant="soft"
          orientation="horizontal"
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            borderRadius: "sm",
          }}>
          <CircularProgress value={35} determinate thickness={8} size="lg">
            35%
          </CircularProgress>
          <CardContent sx={{ ml: 2 }}>
            <Chip
              size="sm"
              variant="outlined"
              sx={{ alignSelf: "flex-start", mb: 1 }}>
              Active
            </Chip>
            <Typography fontSize="xs">Last update: 22/12/22</Typography>
          </CardContent>
        </Card>
      </Sheet>
      <Sheet sx={{ flexGrow: 1 }}>
        <Outlet />
      </Sheet>
    </Box>
  );
}
