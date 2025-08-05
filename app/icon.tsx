import { ImageResponse } from "next/og";

export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

// 파비콘 설정
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 32,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                🖥️
            </div>
        ),
        {
            ...size,
        }
    );
}
