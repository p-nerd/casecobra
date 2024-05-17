import { cn, formatPrice } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { RadioGroup } from "@headlessui/react";
import useCreateCaseDesign, { TFinish } from "@/states/useCreateCaseDesign";

const SelectFinish = (p: { finishes: TFinish[] }) => {
    const { finish, setFinish } = useCreateCaseDesign();

    return (
        <RadioGroup value={finish} onChange={finish => setFinish(finish)}>
            <Label>Finish</Label>
            <div className="mt-3 space-y-4">
                {p.finishes.map(option => (
                    <RadioGroup.Option
                        key={option.value}
                        value={option}
                        className={({ active, checked }) =>
                            cn(
                                "relative block cursor-pointer rounded-lg border-2 border-zinc-200",
                                "bg-white px-6 py-4 shadow-sm outline-none ring-0 focus:outline-none",
                                "focus:ring-0 sm:flex sm:justify-between",
                                {
                                    "border-primary": active || checked,
                                },
                            )
                        }
                    >
                        <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                                <RadioGroup.Label className="font-medium text-gray-900" as="span">
                                    {option.label}
                                </RadioGroup.Label>

                                {option.description ? (
                                    <RadioGroup.Description as="span" className="text-gray-500">
                                        <span className="block sm:inline">
                                            {option.description}
                                        </span>
                                    </RadioGroup.Description>
                                ) : null}
                            </span>
                        </span>

                        <RadioGroup.Description
                            as="span"
                            className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                        >
                            <span className="font-medium text-gray-900">
                                {formatPrice(option.price / 100)}
                            </span>
                        </RadioGroup.Description>
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
};

export default SelectFinish;
