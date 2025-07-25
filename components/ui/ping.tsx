export default function Ping() {
    return (
        <span className="-ml-2 relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
        </span>
    );
}
