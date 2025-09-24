import Button from "../common/Button/Button";

export const PageButtons = ({ isPreviousExists, isNextExists }) => (
  <div className="flex items-center justify-between">
    <Button
      disabled={!isPreviousExists}
      className="bg-blue-700 capitalize py-2 px-4 text-[16px] text-white"
    >
      <i className="fa-solid fa-angle-left text-white text-md pr-1"></i>
      Previous
    </Button>

    <Button
      disabled={!isNextExists}
      className="bg-blue-700 capitalize py-2 px-4 text-[16px] text-white"
    >
      Next
      <i className="fa-solid fa-angle-right text-white text-md pl-1"></i>
    </Button>
  </div>
);
