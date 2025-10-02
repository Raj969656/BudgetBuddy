export default function GradientBackground({children}) {
    console.log(children)
    return <div className="min-h-screen w-full relative">

        {/* Radial Gradient Background */}
        <div
            className="absolute inset-0 z-0"
            style={{
                background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
            }}
        />
       <div className={"z-10 relative"}>
           {children}
       </div>
    </div>
}