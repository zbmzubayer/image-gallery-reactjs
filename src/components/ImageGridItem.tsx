import { useRef } from 'react';
import '../App.css';
import { Image } from '@/constants';

interface Props {
  gridContainerRef: React.RefObject<HTMLDivElement>;
  image: Image;
  index: number;
  selectedImages: string[];
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageGridItem({
  gridContainerRef,
  image,
  index,
  selectedImages,
  onChangeHandler,
}: Props) {
  // const [dragging, setDragging] = useState(false);

  // const gridContainerRef = useRef<HTMLDivElement>(null);
  const dragItem = useRef<number | undefined>(undefined);
  const dragOverItem = useRef<number | undefined>(undefined);
  const dragItemNode = useRef<HTMLDivElement | null>(null);
  const dragOverItemNode = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragItem.current = index;
    dragItemNode.current = e.currentTarget;
    // console.log("drag Start", dragItemNode.current);
    // dragItemNode.current?.classList.remove("cursor-grab");
    // dragItemNode.current?.classList.add("cursor-grabbing");
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragOverItem.current = index;
    if (dragItem.current == dragOverItem.current) return;
    dragOverItemNode.current = e.currentTarget;
    const div = document.createElement('div');
    div.innerHTML = 'Hello';
    div.classList.add('drag-placeholder');
    console.log(gridContainerRef.current);
    gridContainerRef.current?.appendChild(gridContainerRef.current?.children[dragOverItem.current]);
    console.log(div);

    // dragItemNode.current?.classList.add("cursor-grabbing");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragOverItem.current = index;
    gridContainerRef.current?.removeChild(gridContainerRef.current?.children[dragOverItem.current]);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (dragItem.current === dragOverItem.current) return;
    const imageClone = [...image];
  };

  return (
    //   <div
    //     className={`group row-start-1 row-span-2 col-span-2 bg-white hover:bg-gray-300 relative flex items-center justify-center border-2 hover:border-gray-300  rounded-[10px]`}
    //     draggable
    //     onDragStart={(e) => handleDragStart(e, index)}
    //     onDragEnter={(e) => handleDragEnter(e, index)}
    //     onDragLeave={(e) => console.log("drag leave", e)}
    //     onDragEnd={(e) => handleDragEnd(e, index)}
    //     onDragOver={(e) => e.preventDefault()}
    //   >
    //     <img
    //       src={image.image}
    //       alt={"Image" + image.id}
    //       className="rounded-lg group-hover:mix-blend-multiply"
    //     />
    //     <input
    //       type="checkbox"
    //       name={image.id}
    //       checked={selectedImages.includes(image.id)}
    //       className="peer h-4 w-4 hidden absolute left-4 top-4 cursor-pointer bg-slate-500 group-hover:inline-block focus:inline-block checked:inline-block"
    //       onChange={onChangeHandler}
    //     />
    //   </div>
    // ) : (
    <div
      className={`group relative flex cursor-grab items-center justify-center rounded-[10px] border-2 bg-white  hover:border-gray-400 hover:bg-gray-400 ${
        image.featured && 'col-span-2 row-span-2 row-start-1'
      }`}
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragEnter={(e) => handleDragEnter(e, index)}
      onDragLeave={(e) => handleDragLeave(e, index)}
      onDragEnd={(e) => handleDragEnd(e, index)}
      onDragOver={(e) => e.preventDefault()}
    >
      <img
        src={image.image}
        alt={'Image' + image.id}
        className="rounded-lg group-hover:mix-blend-multiply"
      />
      <input
        type="checkbox"
        name={image.id}
        checked={selectedImages.includes(image.id)}
        className="peer absolute left-4 top-4 hidden h-4 w-4 cursor-pointer bg-slate-500 checked:inline-block focus:inline-block group-hover:inline-block"
        onChange={onChangeHandler}
      />
    </div>
  );
}
