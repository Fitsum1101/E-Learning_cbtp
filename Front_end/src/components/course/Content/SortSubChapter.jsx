import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import SubChapter from "./SubChapter";

const SortSubChapter = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: {
      duration: 150,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      ...transition,
    },
    ...(isDragging && {
      zIndex: 99999,
      position: "relative",
    }),
  };
  return (
    <div
      style={style}
      className={`${
        isDragging
          ? "bg-blue-500 semi-bold text-[#0D1B2A] cursor-grabbing font-semibold"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <SubChapter
        title={props.title}
        isMainColor={isDragging}
        totalMinute={props.totalMinute}
      />
    </div>
  );
};

export default SortSubChapter;
