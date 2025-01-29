"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { Star, Bookmark, Briefcase, BarChart3, Hash, Settings } from "lucide-react";
import Button from "../ui/button";

interface MoreOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MoreOptionsModal({ isOpen, onClose }: MoreOptionsModalProps) {
  const options = [
    { icon: Star, label: "Premium", href: "/premium" },
    { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
    { icon: Briefcase, label: "Jobs", href: "/jobs" },
    { icon: BarChart3, label: "Ads", href: "/ads" },
    { icon: Hash, label: "Spaces", href: "/spaces" },
    { icon: Settings, label: "Settings and Privacy", href: "/settings" },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-start justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-[300px] transform overflow-y-auto rounded-lg bg-black text-white border border-gray-800 shadow-[0_0_15px_rgba(255,255,255,0.2),0_0_3px_1px_rgba(255,255,255,0.15)] transition-all"
          style={{
            position: "fixed",
            top: "20%",
            left: "18.5%",
            maxHeight: "90vh",
          }}
        >

          <div className="flex flex-col">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={onClose}
                className="flex items-center w-full text-left p-4 hover:bg-gray-900 transition-colors"
              >
                <option.icon className="mr-4 h-5 w-5" />
                <span>{option.label}</span>
              </Button>
            ))}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}