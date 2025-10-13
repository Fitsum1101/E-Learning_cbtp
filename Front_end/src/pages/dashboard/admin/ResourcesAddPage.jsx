import {
  ArchiveIcon,
  ArrowLeft,
  CopyIcon,
  DessertIcon,
  EditIcon,
  MoreHorizontalIcon,
  Upload,
  UploadCloudIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  ListItemIcon,
  Menu,
  MenuItem,
  Button as MaterialButton,
  Select,
  styled,
  Typography,
  Divider,
  alpha,
} from "@mui/material";
import Input from "../../../components/common/Input/Input";
import SelectCourse from "../../../components/questions/SelectCourse";
import Button from "../../../components/common/Button/Button";
import { useState } from "react";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        ...theme.applyStyles("dark", {
          color: "inherit",
        }),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function ResourcesAddPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto md:px-6 lg:px-8">
      <div className="mb-6">
        <Link to="/resources">
          <Button className="flex items-center py-2 mb-4 hover:bg-blue-100">
            <ArrowLeft className="w-4 h-4 mr-3" />
            Back to Resources
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Upload Resource</h1>
        <p className="mt-2 text-muted-foreground">
          Add a new resource to your course library
        </p>
      </div>
      <Card className="p-4 bg-white">
        <div className="mb-4">
          <h3 className="font-semibold">Resource Details</h3>
          <p className="text-gray-600 text-md">
            Fill in the information below to upload a new resource
          </p>
        </div>
        <div className="mb-2 text-gray-700">
          <h3 className="pb-2 font-semibold">Course *</h3>
          <SelectCourse
            courses={[
              { title: "web development", id: 19199 },
              { title: "werku", id: 19199 },
            ]}
            dropdownOpen={false}
            handleOpen={true}
            selectedCourse={{ title: "web development", id: 19199 }}
          />
        </div>
        <div className="my-2 text-gray-700">
          <h3 className="pb-2 font-semibold">Attach to specific lessons *</h3>
          <SelectCourse
            courses={[
              { title: "web development", id: 19199 },
              { title: "werku", id: 19199 },
            ]}
            dropdownOpen={false}
            handleOpen={true}
            selectedCourse={{
              title: "select a resources lesson or leave it ",
              id: 19199,
            }}
          />
        </div>
        <div className="text-gray-700 ">
          <h3 className="pb-2 font-semibold">Resource name *</h3>
          <Input
            className="w-full border border-blue-500"
            placeholder="e.g introduction of java script"
          />
        </div>
        <div className="my-2 text-gray-800">
          <h3 className="pb-2 text-lg font-semibold">Resources type*</h3>
          <SelectCourse
            courses={[
              { title: "web development", id: 19199 },
              { title: "werku", id: 19199 },
            ]}
            dropdownOpen={false}
            handleOpen={true}
            selectedCourse={{ title: "video", id: 19199 }}
          />
        </div>
        <div>
          <h3 className="pb-2 font-semibold">Upload file*</h3>

          <label htmlFor="cover-image" className="file-upload-label">
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 hover:border-gray-400 transition-colors rounded-md border-2 border-dashed border-gray-300   `}
            >
              <div className="space-y-1 text-center">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <span className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer focus-within:outline-none hover:text-blue-500">
                    Upload a file
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
              </div>
            </div>
          </label>
        </div>
        <div className="my-2 mb-8">
          <h3 className="pb-2 font-semibold">Description</h3>
          <textarea
            placeholder="Add a brief description of thie resources..."
            className="w-full h-20 p-2 text-sm text-gray-900 border border-gray-400 rounded-md focus:outline-blue-500 placeholder:text-gray-500"
          ></textarea>
        </div>
        <div className="flex gap-2 mb-2">
          <Button className="flex items-center gap-2 py-2 text-sm text-white bg-blue-600 border-blue-600 borer hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Resources
          </Button>
          <Button className="flex items-center gap-2 py-2 text-sm border border-blue-100 hover:bg-blue-100 bg-blue-50">
            Cancel
          </Button>
        </div>
        <div>
          <MaterialButton
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            // endIcon={<KeyboardArrowDownIcon />}
          >
            Options
          </MaterialButton>
          <StyledMenu
            id="demo-customized-menu"
            slotProps={{
              list: {
                "aria-labelledby": "demo-customized-button",
              },
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} disableRipple>
              <EditIcon />
              Edit
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <CopyIcon />
              Duplicate
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose} disableRipple>
              <ArchiveIcon />
              Archive
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <MoreHorizontalIcon />
              More
            </MenuItem>
          </StyledMenu>
        </div>
      </Card>
    </div>
  );
}
