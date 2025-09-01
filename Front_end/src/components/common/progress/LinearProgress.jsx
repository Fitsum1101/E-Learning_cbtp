import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: value === 100 ? "#4caf50" : "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

export default function CustomizedProgressBars({ value }) {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <BorderLinearProgress
        color="primary"
        variant="determinate"
        value={value}
      />
    </Stack>
  );
}
