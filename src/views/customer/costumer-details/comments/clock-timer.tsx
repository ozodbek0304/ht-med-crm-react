import { ResultDetails } from "@/interfaces/customer";
import React, { useState, useEffect } from "react";

const ClockTimer = ({ data }: { data: ResultDetails | undefined }) => {

    const backendTime = data?.seller?.last_activity ? new Date(data?.seller?.last_activity) : undefined;

    const [timeDifference, setTimeDifference] = useState<{ days: number, hours: number, minutes: number, seconds: number }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            if (backendTime) {
                const now = new Date();
                const difference = now.getTime() - backendTime.getTime();

                const seconds = Math.floor((difference / 1000) % 60);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));

                setTimeDifference({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [backendTime]);





    const { days, hours, minutes, seconds } = timeDifference;

    const numbers = [
        { num: 12, x: 100, y: 30, label: "Soat" },
        { num: 1, x: 140, y: 40, label: "Daqiqa" },
        { num: 2, x: 165, y: 65, label: "Sekund" },
        { num: 3, x: 175, y: 100, label: "Soat" },
        { num: 4, x: 165, y: 135, label: "Daqiqa" },
        { num: 5, x: 140, y: 160, label: "Sekund" },
        { num: 6, x: 100, y: 170, label: "Soat" },
        { num: 7, x: 60, y: 160, label: "Daqiqa" },
        { num: 8, x: 35, y: 135, label: "Sekund" },
        { num: 9, x: 25, y: 100, label: "Soat" },
        { num: 10, x: 35, y: 65, label: "Daqiqa" },
        { num: 11, x: 60, y: 40, label: "Sekund" },
    ];

    return (
        <div className="flex flex-col gap-1 mt-2 items-center justify-center">
            <svg width="100" height="100" viewBox="0 0 200 200">
                {/* Soat yuzi */}
                <circle cx="100" cy="100" r="95" stroke="black" strokeWidth="5" fill="white" />

                {/* Soat raqamlari */}
                {numbers.map((n, index) => (
                    <g key={index}>
                        <text
                            x={n.x}
                            y={n.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="16"
                            fontWeight="bold"
                        >
                            {n.num}
                        </text>
                    </g>
                ))}

                {/* Dinamik soatlar */}
                <polygon
                    points="95,100 105,100 99,60 98,60"
                    fill="black"
                    transform={`rotate(${(hours % 12) * 30}, 100, 100)`}
                />

                {/* Dinamik daqiqalar */}
                <polygon
                    points="97,102 103,100 101,50 99,50"
                    fill="black"
                    transform={`rotate(${minutes * 6}, 100, 100)`}
                />

                {/* Dinamik sekundlar */}
                <polygon
                    points="98.5,100 101.5,100 100.5,30 99.5,30"
                    fill="red"
                    transform={`rotate(${seconds * 6}, 100, 100)`}
                />
            </svg>
            <div>
                <div className="flex flex-col items-center">
                    <div className="text-lg font-semibold text-black dark:text-white">
                        {days > 30
                            ? `${days} kun`
                            : `${hours.toString().padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`}
                    </div>
                    <div className="flex gap-3 w-50 text-black dark:text-white">
                        <div className="font-medium text-[14px]">Kun</div>
                        <div className="font-medium text-[14px]">Soat</div>
                        <div className="font-medium text-[14px]">Minut</div>
                        <div className="font-medium text-[14px]">Sekund</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClockTimer;
