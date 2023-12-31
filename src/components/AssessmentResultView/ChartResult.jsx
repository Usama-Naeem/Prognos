import {getElementAtEvent, Pie} from "react-chartjs-2";
import React, {useState} from "react";

const ChartResult = ({chartRef, data, options, stages}) => {
    const [reversible, setReversible] = useState(false)
    const [depression, setDepression] = useState(false)
    const [alzheimer, setAlzheimer] = useState(false)

    return (
        <div className="w-full h-[300px] md:h-[600px] flex justify-center">
        <Pie
            ref={chartRef}
            data={data}
            options={options}
            onClick={(event) => {
                const element = getElementAtEvent(chartRef.current, event);
                if (element[0]?.index === 0) {
                    setAlzheimer(true);
                    setDepression(false);
                    setReversible(false);
                }
                if (element[0]?.index === 1) {
                    setDepression(true);
                    setAlzheimer(false);
                    setReversible(false);
                }
                if (element[0]?.index === 2) {
                    setReversible(true);
                    setDepression(false);
                    setAlzheimer(false);
                }
            }}
        />
        {/* dementia stage text */}

        {!!reversible && (
            <p className="mt-4 text-sm text-center md:text-xl">
                {stages.reversibleDimensia >
                (stages.alzheimer && stages.depression)
                    ? bigChunk
                    : smallChunk}{" "}
                that the symptoms reported are due to a condition that can be
                reversed or treated.
            </p>
        )}

        {!!depression && (
            <p className="mt-4 text-sm text-center md:text-xl">
                Depression is a subset of the reversible or treatable conditions
                that may explain the symptoms reported.{" "}
                {stages.depression >
                (stages.alzheimer && stages.reversibleDimensia)
                    ? bigChunk
                    : smallChunk}{" "}
                that the symptoms reported are due to depression.
            </p>
        )}

        {!!alzheimer && (
            <p className="mt-4 text-sm text-center md:text-xl">
                {stages.alzheimer >
                (stages.depression && stages.reversibleDimensia)
                    ? bigChunk
                    : smallChunk}{" "}
                that the symptoms reported are due to a condition that is
                irreversible.
            </p>
        )}
    </div>)
}

export default ChartResult;