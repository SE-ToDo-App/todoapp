import Badge, { badgeClasses } from "@mui/joy/Badge";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  useColorScheme,
} from "@mui/joy";
import { Outlet, useLoaderData, useNavigate, useSearch, Await, useMatch, Link, useRouterState } from "@tanstack/react-router";
import { Suspense } from "react";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import CircularProgress from "@mui/joy/CircularProgress";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import CreateTodo from "./todo/CreateTodoList";
import ListSubheader from "@mui/joy/ListSubheader";
import Option from "@mui/joy/Option";
import PersonIcon from "@mui/icons-material/Person";
import PieChart from "@mui/icons-material/PieChart";
import Select from "@mui/joy/Select";
import Sheet from "@mui/joy/Sheet";
import SmsIcon from "@mui/icons-material/Sms";
import Typography from "@mui/joy/Typography";
import { useAuth } from "../services/firebase.config";
import { DEFAULT_GROUP_NAME } from "../utils/constants";

const containerStyle = {
  display: "flex",
  overflow: "auto",
  height: "100%",
};
export default function Sidebar() {
  const { mode, setMode } = useColorScheme();
  const { groups, count } = useLoaderData({ strict: false });
  console.log("groups", groups);
  const {list} = useSearch({strict: false});
  const pathName = useRouterState({select: (state) => state.location.pathname})

  const handleSelect = (_, newValue) => {
    const adjustedValue = newValue || DEFAULT_GROUP_NAME;
    navigate({search: (prev) => ({ ...prev, list: adjustedValue })}); 
  };
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
          <IconButton onClick={() => navigate({to: "/login"})}>
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
          size="sm"
          value = {list}
          onChange={handleSelect}
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
          {groups?.map(([id, group]) => (
            <Option value={id} key={id}>
              {group.name}
            </Option>
          ))}
        </Select>
        <List
          sx={{
            "--ListItem-radius": "8px",
            "--List-gap": "4px",
            flexGrow: 0,
            minWidth: 200,
          }}>
          <ListItemButton
            selected={pathName === "/"}
            component={Link}
            to="/"
            search={(prev) => ({ list: prev.list })}
            >
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
              <Suspense>
                <Await promise={count}>
                  {(data) => data}
                  </Await>
              </Suspense>
            </Chip>
          </ListItemButton>
          <ListItemButton
            selected={pathName === "/tags"}
            component={Link}
            to="/tags"
            search={(prev) => ({ list: prev.list })}
            >
            <ListItemDecorator>
              <PersonIcon />
            </ListItemDecorator>
            Tags
          </ListItemButton>
        </List>
        <ListItem nested>
          <ListSubheader>Shortcuts</ListSubheader>
          <List>
            <CreateTodo />
          </List>
        </ListItem>
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
