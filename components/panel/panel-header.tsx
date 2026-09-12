export function PanelHeader({title,children}) {
    return(
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        
          <h2 className="text-sm font-semibold uppercase tracking-wider" 
                         style={{
                fontFamily: "var(--font-norse)",
                background:
                  "linear-gradient(180deg, #dbeafe 0%, #8da9bd 45%, #526b7a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 14px rgba(80, 160, 220, 0.22)",
              }}
                         
                         >
            {title} 
          </h2>
       

        <div className="flex items-center gap-1 text-xs text-emerald-400"   style={{ fontFamily: "var(--font-norse)" }}>
            {children}
         
        </div>
      </div>
    )
}