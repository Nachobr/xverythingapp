import { Dialog, DialogPanel } from "@headlessui/react";
import Button from "../ui/button";
import { MessageSquare, ShoppingBag } from "lucide-react";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostModal({ isOpen, onClose }: PostModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-start justify-center p-4">
        <DialogPanel

          transition
          className="w-full max-w-[235px] transform overflow-y-auto rounded-lg bg-black text-white border border-gray-800 shadow-[0_0_15px_rgba(255,255,255,0.2),0_0_3px_1px_rgba(255,255,255,0.15)] transition-all"
          style={{
            position: "fixed",
            top: "50.3%",
            left: "20.9%",
            maxHeight: "90vh",
          }}
        >
          <div className="p-4">
            
            <div className="grid gap-4">
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
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}