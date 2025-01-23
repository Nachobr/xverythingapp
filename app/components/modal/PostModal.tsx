import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Button from "../ui/button";
import { MessageSquare, ShoppingBag } from "lucide-react";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostModal({ isOpen, onClose }: PostModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black text-white border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create a post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DialogTrigger asChild>
            <Button
              onClick={onClose}
              className="w-full justify-start text-left h-16 bg-transparent hover:bg-gray-900 border border-gray-800"
            >
              <MessageSquare className="mr-4 h-6 w-6" />
              <div>
                <div className="font-semibold">Regular Post</div>
                <div className="text-sm text-gray-400">Share your thoughts</div>
              </div>
            </Button>
          </DialogTrigger>
          <Button
            onClick={onClose}
            className="w-full justify-start text-left h-16 bg-transparent hover:bg-gray-900 border border-gray-800"
          >
            <ShoppingBag className="mr-4 h-6 w-6" />
            <div>
              <div className="font-semibold">Shop Item</div>
              <div className="text-sm text-gray-400">List a product or service</div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}