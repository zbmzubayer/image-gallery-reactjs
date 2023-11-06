import { Image } from '@/constants';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

interface TrashDialogProps {
  trashImages: Image[];
  setTrashImages: React.Dispatch<React.SetStateAction<Image[]>>;
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  setAddImages: React.Dispatch<React.SetStateAction<Image[]>>;
}

export function TrashDialog({
  trashImages,
  setTrashImages,
  setImages,
  setAddImages,
}: TrashDialogProps) {
  const handleRestoreAll = () => {
    setImages((prev) => [...prev, ...trashImages]);
    setTrashImages([]);
    toast.success('Photos restored successfully!');
  };

  const handleDeleteAll = () => {
    setAddImages((prev) => [...prev, ...trashImages]);
    setTrashImages([]);
    toast.error('Photos deleted permanently!');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Trash2Icon className="mr-2 h-4 w-4" />
          Trash
        </Button>
      </DialogTrigger>
      <DialogContent className="flex min-h-[70vh] max-w-[350px] flex-col justify-between overflow-y-auto rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle>Trash Bin</DialogTitle>
          <DialogDescription>Restore or permanently delete your images</DialogDescription>
        </DialogHeader>
        {trashImages.length > 0 ? (
          <div className="flex-1">
            <div className="grid grid-cols-4 gap-3">
              {trashImages?.map((image) => (
                <div
                  key={image.id}
                  className={`group relative flex items-center justify-center rounded-[10px] border-2 bg-white hover:border-gray-300 hover:bg-gray-300`}
                >
                  <img
                    src={image.image}
                    alt={'Image' + image.id}
                    className="rounded-lg group-hover:mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Trash2Icon className="h-10 w-10 text-gray-500" />
            <p className="text-gray-500">Trash is empty</p>
          </div>
        )}
        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-sm"
            disabled={!trashImages.length}
            onClick={handleRestoreAll}
          >
            Restore all
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="text-sm"
            disabled={!trashImages.length}
            onClick={handleDeleteAll}
          >
            Delete all permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
