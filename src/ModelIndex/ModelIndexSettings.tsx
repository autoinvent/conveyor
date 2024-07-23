import type { ComponentProps } from 'react';
import { Settings } from 'lucide-react';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { Button } from '@/lib/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/lib/components/ui/tabs';

import { ModelFilter } from '@/ModelFilter';

import { useModelIndexStore } from './useModelIndexStore';

export interface ModelIndexSettingsProps
  extends ComponentProps<typeof Dialog> {}

export const ModelIndexSettings = ({
  children,
  ...dialogProps
}: ModelIndexSettingsProps) => {
  const fields = useModelIndexStore((state) => state.fields);
  const tableViewOptions = useModelIndexStore(
    (state) => state.tableViewOptions,
  );
  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>Table Settings</DialogTitle>
            <DialogDescription>
              The different tabs will show different table settings.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden.Root>
        <Tabs defaultValue="Filters">
          <TabsList className="w-full">
            <TabsTrigger value="Filters" className="flex-1">
              Filters
            </TabsTrigger>
            <TabsTrigger value="Sort" className="flex-1">
              Sort
            </TabsTrigger>
          </TabsList>

          {children === undefined ? (
            <>
              <TabsContent value="Filters">
                <ModelFilter
                  fields={fields}
                  tableViewOptions={tableViewOptions}
                />
              </TabsContent>
              <TabsContent value="Sort">world</TabsContent>
            </>
          ) : (
            children
          )}
        </Tabs>
        <DialogClose className="right-1" />
      </DialogContent>
    </Dialog>
  );
};
