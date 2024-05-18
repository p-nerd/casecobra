import type { TColor } from "@/types/createCase";

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { RadioGroup } from "@headlessui/react";

import useCreateCaseDesign from "@/states/useCreateCaseDesign";

const SelectColor = (p: { colors: TColor[] }) => {
    const { color, setColor } = useCreateCaseDesign();

    return (
        <RadioGroup value={color} onChange={c => setColor(c)}>
            <Label>Color: {color?.label}</Label>
            <div className="mt-3 flex items-center space-x-3">
                {p.colors.map(c => {
                    return (
                        <RadioGroup.Option
                            key={c.label}
                            value={c}
                            className={cn(
                                "relative -m-0.5 flex cursor-pointer items-center justify-center",
                                "rounded-full border-2 border-transparent p-0.5 focus:outline-none",
                                "focus:ring-0 active:outline-none active:ring-0",
                            )}
                            style={{
                                borderColor: c.id === color?.id ? color.value : "",
                            }}
                        >
                            <span
                                className={cn(
                                    "h-8 w-8 rounded-full border border-black border-opacity-10",
                                )}
                                style={{
                                    backgroundColor: c.value,
                                }}
                            />
                        </RadioGroup.Option>
                    );
                })}
            </div>
        </RadioGroup>
    );
};

export default SelectColor;
