import { useState, useRef } from 'react';
import { XIcon, TrashIcon } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { Image, allImages } from '@/constants';
import Header from '@/components/Header';
import { TrashDialog } from '@/components/TrashDialog';
import ImageGrid from '@/components/ImageGrid';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import './App.css';

function App() {
  const [images, setImages] = useState<Image[]>(allImages);
  const [trashImages, setTrashImages] = useState<Image[]>([]);
  const [addImages, setAddImages] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // For storing the ids of selected images
  const selectDivRef = useRef<HTMLDivElement>(null); // For showing the count of selected images

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    selectDivRef.current?.classList.remove('invisible');
    if (checked) {
      setSelectedImages((prev) => [...prev, name]);
    } else {
      setSelectedImages((prev) => prev.filter((id) => id !== name));
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedImages(allImages.map((image) => image.id));
    } else {
      setSelectedImages([]);
    }
  };

  const handleDeselect = () => {
    setSelectedImages([]);
    selectDivRef.current?.classList.add('invisible');
  };

  const handleDelete = () => {
    const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
    const deletedImages = images.filter((image) => selectedImages.includes(image.id));
    if (deletedImages.find((image) => image.featured) && updatedImages.length) {
      updatedImages[0].featured = true;
      const deletedFeaturedImage = deletedImages.find((image) => image.featured);
      if (deletedFeaturedImage) {
        deletedFeaturedImage.featured = false;
      }
    }
    setImages(updatedImages);
    setSelectedImages([]);
    setTrashImages((prev) => [...prev, ...deletedImages]);
    toast.error('Moved to trash!');
  };

  return (
    <>
      <Header />
      <main className="container mx-auto">
        <div className="mt-5 space-y-5 rounded-lg border-2 px-10 py-5 dark:bg-slate-900">
          <div className="flex justify-between">
            <div
              ref={selectDivRef}
              className="invisible flex flex-col gap-3 md:flex-row md:items-center"
            >
              <div className={cn(buttonVariants({ variant: 'ghost' }), 'space-x-2')}>
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  className="h-4 w-4"
                  checked={selectedImages.length === allImages.length}
                  onChange={handleSelectAll}
                />
                <label htmlFor="selectAll">All</label>
                <button className="" onClick={handleDeselect}>
                  <XIcon className="ml-3 h-4 w-4" />
                </button>
              </div>
              <p className="font-medium lg:text-lg">{selectedImages.length} files selected</p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <TrashDialog
                trashImages={trashImages}
                setTrashImages={setTrashImages}
                setImages={setImages}
                setAddImages={setAddImages}
              />
              <Button
                variant="destructive"
                className={`${selectedImages.length === 0 && 'hidden'}`}
                onClick={handleDelete}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
          <ImageGrid
            images={images}
            setImages={setImages}
            addImages={addImages}
            setAddImages={setAddImages}
            selectedImages={selectedImages}
            onChangeHandler={onChangeHandler}
          />
        </div>
        <Toaster richColors />
      </main>
    </>
  );
}

export default App;
