import { useEffect, useRef } from "react";
import "cubing/twisty";

export default function CubeViewer({ alg }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        ref.current.alg = alg;
    }, [alg]);

    return (
        <twisty-player
            ref={ref}
            control-panel="none"
            background="none"
            style={{
                width: "500px",
                height: "500px",
                margin: "auto",
            }}
        />
    );
}