import { Image } from '@/constants';
import { ImagePlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useRef } from 'react';

interface ImageGridProps {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  addImages: Image[];
  setAddImages: React.Dispatch<React.SetStateAction<Image[]>>;
  selectedImages: string[];
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageGrid({
  images,
  setImages,
  addImages,
  setAddImages,
  selectedImages,
  onChangeHandler,
}: ImageGridProps) {
  const dragItem = useRef<number | undefined>(undefined);
  const dragOverItem = useRef<number | undefined>(undefined);

  const handleAddImage = () => {
    if (addImages?.length === 0) {
      toast.warning('No images to add! After deleting permanently from trash, you can add images');
    } else {
      setImages((prev) => [...prev, ...addImages]);
      setAddImages([]);
      toast.success('Photos added successfully!');
    }
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current === dragOverItem.current) return;
    const imageClone = [...images];
    if (dragItem.current !== undefined && dragOverItem.current !== undefined) {
      if (imageClone[dragItem.current].featured) {
        imageClone[dragItem.current].featured = false;
        imageClone[0].featured = true;
        imageClone.splice(dragOverItem.current + 1, 0, imageClone[dragItem.current]);
        imageClone.splice(dragItem.current + 1, 1, imageClone[0]);
        imageClone.splice(0, 1);
      } else if (imageClone[dragOverItem.current].featured) {
        imageClone[dragOverItem.current].featured = false;
        imageClone[dragItem.current].featured = true;
        imageClone.splice(0, 0, imageClone[dragOverItem.current]);
        imageClone.splice(dragOverItem.current + 1, 1);
      } else if (dragItem.current < dragOverItem.current) {
        imageClone.splice(dragOverItem.current + 1, 0, imageClone[dragItem.current]);
        imageClone.splice(dragItem.current, 1);
      } else {
        imageClone.splice(dragOverItem.current!, 0, imageClone[dragItem.current]);
        imageClone.splice(dragItem.current + 1, 1);
      }
    }
    setImages(imageClone);
    console.log(images);
  };

  return (
    <>
      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl text-gray-500">No images found</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`group relative flex cursor-grab items-center justify-center rounded-[10px] border-2 bg-white  hover:border-gray-400 hover:bg-gray-400 ${
              image.featured && 'col-span-2 row-span-2 row-start-1'
            }`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
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
        ))}
        <button
          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-500"
          onClick={handleAddImage}
        >
          <ImagePlusIcon className="h-8 w-8 text-gray-500" />
          <span className="font-medium text-gray-600 dark:text-gray-300">Add Image</span>
        </button>
      </div>
    </>
  );
}
