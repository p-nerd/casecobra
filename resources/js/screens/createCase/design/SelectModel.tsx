import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useCreateCaseDesign, { type TModel } from "@/states/useCreateCaseDesign";

const SelectModel = (p: { models: TModel[] }) => {
    const { model, setModel } = useCreateCaseDesign();

    return (
        <div className="relative flex w-full flex-col gap-3">
            <Label>Model</Label>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                        {model?.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {p.models.map(m => (
                        <DropdownMenuItem
                            key={m.value}
                            className={cn(
                                "flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100",
                                {
                                    "bg-zinc-100": m.label === model?.label,
                                },
                            )}
                            onClick={() => {
                                setModel(m);
                            }}
                        >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    m.label === model?.label ? "opacity-100" : "opacity-0",
                                )}
                            />
                            {m.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default SelectModel;
