export default function InflearnIcon({
    fill,
    stroke,
    className,
}: {
    fill?: string;
    stroke?: string;
    className?: string;
}) {
    return (
        <svg
            version="1.1"
            id="brandicon"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xmlSpace="preserve"
            fill={fill}
            stroke={stroke}
            className={className}
        >
            <path
                d="M16,3.3c-0.9-1.1-2.1-2-3.4-2.6C11.5,0.3,10.4,0,9.2,0c0,0-0.1,0-0.1,0H9C4,0,0,4,0,9s4,9,9,9h9V9C18,6.9,17.3,4.9,16,3.3z
	 M3.1,13L3.1,13C0.9,9.7,1.7,5.3,5,3.1s7.7-1.3,9.9,1.9c0.8,1.2,1.2,2.6,1.2,4v3.8l0,2.4L9.5,8.5l1.5-4c0.1-0.3-0.1-0.7-0.4-0.8
	 c-0.3-0.1-0.7,0.1-0.8,0.4l0,0L8.5,7.5L6.3,5.3C6.1,5,5.7,5,5.4,5.3C5.1,5.5,5.1,6,5.4,6.2l5.2,5.3H6.7c-0.4,0-0.7,0.3-0.7,0.7
	 c0,0.4,0.3,0.7,0.7,0.7l0,0h5.2l3.3,3.3H9.6l-0.6,0c-1,0-1.9-0.2-2.8-0.6C5,15,3.9,14.2,3.1,13L3.1,13z"
            />
        </svg>
    );
}
