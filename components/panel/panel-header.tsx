import { ReactNode } from "react"

type Props = {
  title:string,
  children:ReactNode
}

export function PanelHeader({title,children}:Props) {
    return(
        <div className="flex items-center justify-between border-b border-neutral-400/10 px-4 py-3">
          {title && (
               <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400/70" 
                         style={{
                fontFamily: "var(--font-norse)",
               
              }}
                         
                         >
            {title} 
          </h2>

          )}
         
       

        <div className="flex items-center gap-1 text-xs text-emerald-400"   style={{ fontFamily: "var(--font-norse)" }}>
            {children}
         
        </div>
      </div>
    )
}