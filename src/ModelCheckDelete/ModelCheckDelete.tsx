import { Button } from '@/lib/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { CheckDeleteResult } from '@/types';
import type { ComponentProps } from 'react';

export interface ModelCheckDeleteProps
  extends CheckDeleteResult,
    ComponentProps<typeof Card> {
  onDelete: () => void;
  onCancel: () => void;
}

export const ModelCheckDelete = ({
  affected,
  prevented,
  deleted,
  onDelete,
  onCancel,
  className,
  ...props
}: ModelCheckDeleteProps) => {
  const message =
    prevented && prevented.length > 0 ? (
      <span className="text-red-500">
        You are currently not permitted to make these deletions due to resulting
        conflicts. Please review them and try again.
      </span>
    ) : (
      <span>Are you sure you want to confirm these deletions?</span>
    );

  const noEffects =
    (affected === undefined || affected.length === 0) &&
    (prevented === undefined || prevented.length === 0) &&
    (deleted === undefined || deleted.length === 0);

  return (
    <Card className={cn('max-h-fit max-w-md', className)} {...props}>
      <CardHeader>
        <CardTitle className="text-xl">Deletion Conflicts</CardTitle>
      </CardHeader>
      <CardContent>
        {noEffects && (
          <span>There are no conflicts related to your deletions!</span>
        )}
        {affected && affected.length > 0 && (
          <div className="pb-2">
            The following models will be affected by your deletions:
            {affected.length > 4 ? (
              <ScrollArea className="max-h-20 rounded-sm">
                <ul>
                  {affected.map((e) => (
                    <li key={e.id} className="p-1 font-bold">
                      {e.value}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <div>
                {affected.map((e) => (
                  <span key={e.id} className="p-1 px-2 font-bold">
                    {e.value}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        {prevented && prevented.length > 0 && (
          <div className="pb-2">
            The following models are preventing your deletions:
            {prevented.length > 4 ? (
              <ScrollArea className="max-h-20 rounded-sm">
                <ul>
                  {prevented.map((e) => (
                    <li key={e.id} className="p-1 font-bold">
                      {e.value}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <div>
                {prevented.map((e) => (
                  <span key={e.id} className="p-1 px-2 font-bold">
                    {e.value}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        {deleted && deleted.length > 0 && (
          <div className="pb-2">
            The following models will also be deleted as a result of your
            deletions:
            {deleted.length > 4 ? (
              <ScrollArea className="max-h-20 rounded-sm">
                <ul>
                  {deleted.map((e) => (
                    <li key={e.id} className="p-1 font-bold">
                      {e.value}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <div>
                {deleted.map((e) => (
                  <span key={e.id} className="p-1 px-2 font-bold">
                    {e.value}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        <div>{message}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {prevented && prevented.length > 0 ? (
          <Button variant="outline" onClick={() => onCancel()}>
            OK
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="mx-2"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="ml-2 place-self-end"
              onClick={() => onDelete()}
            >
              Confirm
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
