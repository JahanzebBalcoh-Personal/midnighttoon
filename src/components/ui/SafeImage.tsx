"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

export default function SafeImage({ src, fallbackSrc = "/images/comics/forbidden_professor_cover.png", alt, className, ...props }: SafeImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={hasError ? fallbackSrc : imgSrc || fallbackSrc}
            alt={alt || "Image"}
            className={className}
            onError={() => {
                setHasError(true);
            }}
            {...props}
        />
    );
}
