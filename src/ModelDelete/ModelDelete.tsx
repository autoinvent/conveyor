import { Button } from '@/lib/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/lib/components/ui/card';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import type { CheckDeleteResult } from '@/types';

export const ModelDelete = ({ affected, prevented, deleted }: CheckDeleteResult) => {

    const message = (prevented && prevented.length > 0) ? 
    <span className="text-red-500">
        You are currently not permitted to make these deletions due to resulting conflicts. Please review them and try again.
    </span> :
    <span>
        Are you sure you want to confirm these deletions?
    </span> ;

    const noEffects = ((affected === undefined) || affected.length === 0) 
    && ((prevented === undefined) || prevented.length === 0) 
    && ((deleted === undefined) || deleted.length === 0);

    return (
        <div className='flex h-screen items-center justify-center'>
            <Card className='max-h-fit max-w-md'>
                <CardHeader>
                    <CardDescription className="text-lg">Deletion Conflicts</CardDescription>
                </CardHeader>
                <CardContent>
                    {noEffects && (
                        <span>
                            There are no conflicts related to your deletions!
                        </span>
                    )}
                    {(affected && affected.length > 0) &&
                    (<div className="pb-2">
                        The following models will be affected by your deletions:
                        {affected.length > 4 ? (
                        <ScrollArea className="max-h-20 rounded-sm bg-slate-50">
                            <ul>
                                {affected.map((e) => (
                                    (<li key={e.value} className="p-1 font-bold">{e.value}</li>)
                                ))}
                            </ul>
                        </ScrollArea>
                        ) :
                        (
                        <div>
                            {affected.map((e) => (
                                (<span key={e.value} className="p-1 px-2 font-bold">{e.value}</span>)
                            ))}
                        </div>
                        )}
                    </div>
                    )}
                    {(prevented && prevented.length > 0) &&
                    (<div className="pb-2">
                        The following models are preventing your deletions:
                        {prevented.length > 4 ? (
                        <ScrollArea className="max-h-20 rounded-sm bg-slate-50">
                            <ul>
                                {prevented.map((e) => (
                                    (<li key={e.value} className="p-1 font-bold">{e.value}</li>)
                                ))}
                            </ul>
                        </ScrollArea>
                        ) :
                        (
                        <div>
                            {prevented.map((e) => (
                                (<span key={e.value} className="p-1 px-2 font-bold">{e.value}</span>)
                            ))}
                        </div>
                        )}
                    </div>
                    )}
                    {(deleted && deleted.length > 0) &&
                    (<div className="pb-2">
                        The following models will be deleted by your deletions:
                        {deleted.length > 4 ? (
                        <ScrollArea className="max-h-20 rounded-sm bg-slate-50">
                            <ul>
                                {deleted.map((e) => (
                                    (<li key={e.value} className="p-1 font-bold">{e.value}</li>)
                                ))}
                            </ul>
                        </ScrollArea>
                        ) :
                        (
                        <div>
                            {deleted.map((e) => (
                                (<span key={e.value} className="p-1 px-2 font-bold">{e.value}</span>)
                            ))}
                        </div>
                        )}
                    </div>
                    )}
                    <div className="py-4">
                        {message}
                    </div>
                    {(prevented && prevented.length > 0) ? (
                        <div className="flex justify-end">
                            <Button variant="ghost">
                                OK
                            </Button>
                        </div>
                    ) :
                    (
                        <div className="flex justify-end">
                            <Button variant="ghost" className="mx-2">
                                Cancel
                            </Button>
                            <Button variant="destructive" className="ml-2">
                                Confirm
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};