"use client";

import RDConfetti from "react-dom-confetti";
import { useEffect, useState } from "react";

const Confetti = () => {
    const [showConfetti, setShowConfetti] = useState<boolean>(false);

    useEffect(() => setShowConfetti(true), []);

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex select-none justify-center overflow-hidden"
        >
            <RDConfetti active={showConfetti} config={{ elementCount: 200, spread: 90 }} />
        </div>
    );
};

export default Confetti;
