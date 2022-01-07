import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "./icons";
import { styled } from "goober";

export default function ThemeChanger() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div style={{ height: "34px", width: "34px" }}></div>;

    return (
        <div>
            <Button
                onClick={() =>
                    setTheme(resolvedTheme === "light" ? "dark" : "light")
                }
            >
                {resolvedTheme === "light" ? (
                    <MoonIcon size="24px" color="#000" />
                ) : (
                    <SunIcon size="24px" color="#fff" />
                )}
            </Button>
        </div>
    );
}

const Button = styled("div")`
    background: var(--mode);
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
`;
