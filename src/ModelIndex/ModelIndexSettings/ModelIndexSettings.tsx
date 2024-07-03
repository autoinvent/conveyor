import type { ComponentProps } from 'react';
import { Settings } from 'lucide-react';

import { Button } from '@/lib/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/lib/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/lib/components/ui/tabs';

import { ModelIndexFilterSetting } from './ModelIndexFilterSetting';
import { ModelIndexSortSetting } from './ModelIndexSortSetting';
import { cn } from '@/lib/utils';

export interface ModelIndexSettingsProps
  extends ComponentProps<typeof DialogContent> {
  defaultTab?: string;
  tabList?: string[];
}

export const ModelIndexSettings = Object.assign(
  ({
    defaultTab = 'Filter',
    tabList = ['Filter', 'Sort'],
    className,
    children,
    ...dialogContentProps
  }: ModelIndexSettingsProps) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings />
          </Button>
        </DialogTrigger>
        <DialogContent
          className={cn('max-w-fit', className)}
          {...dialogContentProps}
        >
          <Tabs defaultValue={defaultTab}>
            <TabsList className="w-full">
              {tabList.map((tabOption) => (
                <TabsTrigger
                  key={tabOption}
                  value={tabOption}
                  className="flex-1"
                >
                  {tabOption}
                </TabsTrigger>
              ))}
            </TabsList>
            {children === undefined ? (
              <>
                <TabsContent value="Filter">
                  <ModelIndexFilterSetting />
                </TabsContent>
                <TabsContent value="Sort">
                  <ModelIndexSortSetting />
                </TabsContent>
              </>
            ) : (
              children
            )}
          </Tabs>
          <DialogClose className="right-1" />
        </DialogContent>
      </Dialog>
    );
  },
  {
    FilterSetting: ModelIndexFilterSetting,
    SortSetting: ModelIndexSortSetting,
  },
);
