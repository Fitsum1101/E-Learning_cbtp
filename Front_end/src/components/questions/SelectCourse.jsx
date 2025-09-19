import { ChevronDown, ChevronUp } from "lucide-react";
import { useClickOutside } from "../../hooks/handleClickOutside";
import Button from "../common/Button/Button";

const SelectCourse = ({
  handleOpen,
  courses,
  handleSelcetCourse,
  selectedCourse,
  dropdownOpen,
}) => {
  let domNode = useClickOutside(() => {
    handleOpen(false);
  });

  return (
    <>
      <Button
        onClick={handleOpen}
        className={`bg-white flex items-center rounded-[5px] relative px-5 py-[8px] text-base font-medium text-foreground border border-gray-300 hover:border-blue-400  `}
      >
        {selectedCourse?.title}
        {!dropdownOpen ? (
          <ChevronDown className="w-4 h-4 ml-3" />
        ) : (
          <ChevronUp className="w-4 h-4 ml-3" />
        )}
      </Button>
      {dropdownOpen && (
        <div
          ref={domNode}
          className={`shadow-1 h-[30vh] overflow-y-scroll absolute border p-1 border-gray-300 shadow-gray-300 left-15 z-40 mt-2 w-[300px] rounded-md bg-white text-black py-[10px] transition-all `}
        >
          {courses.map((course) => (
            <div
              className="flex items-center justify-between p-1 text-gray-700 rounded-md cursor-pointer hover:bg-blue-400 hover:text-white"
              key={course.id}
              onClick={() => handleSelcetCourse(course)}
            >
              {course.title}
              {selectedCourse?.title === course?.title && (
                <span className="text-gray-500">&#10004;</span>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SelectCourse;
