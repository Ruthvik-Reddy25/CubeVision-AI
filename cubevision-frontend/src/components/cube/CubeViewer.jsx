import { useEffect, useRef } from "react";
import { Alg } from "cubing/alg";
import "cubing/twisty";

export default function CubeViewer({ alg, setupAlg }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.experimentalSetupAlg = setupAlg;
        ref.current.alg = alg;
    }, [alg, setupAlg]);

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