'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { JSX } from 'react';
import { create } from 'zustand';

export type Actions = 'create' | 'edit' | 'view' | 'delete' | false;

interface ActionDialogState {
  open: Actions;
  content?: JSX.Element;
}
interface ActionDialogActions {
  setOpen: (actionType: Actions) => void;
  setContent: (content: JSX.Element) => void;
}

type ActionDialogStore = ActionDialogState & ActionDialogActions;

const useActionDialogStore = create<ActionDialogStore>()((set) => ({
  open: false,
  setOpen: (type: Actions) => set({ open: type }),
  setContent: (content: JSX.Element) => set({ content }),
}));

const localizedAction = {
  create: 'tambah',
  edit: 'edit',
  view: 'detail',
  delete: 'hapus',
};

function ActionDialog() {
  const openAction = useActionDialogStore((s) => s.open);
  const setOpenAction = useActionDialogStore((s) => s.setOpen);
  const content = useActionDialogStore((s) => s.content);
  return (
    <Dialog
      open={openAction !== false ? true : false}
      onOpenChange={(isOpen) =>
        isOpen === false ? setOpenAction(false) : setOpenAction(openAction)
      }
      modal
    >
      <DialogContent className="max-h-[97dvh] min-w-2xl">
        <DialogHeader>
          {!!openAction && (
            <DialogTitle className="capitalize">
              {localizedAction[openAction]} Data
            </DialogTitle>
          )}
          {!!openAction && (
            <DialogDescription className="sr-only">
              {localizedAction[openAction]} Data
            </DialogDescription>
          )}
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}

export { ActionDialog, useActionDialogStore };
