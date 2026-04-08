import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { allPages } from "@/data"
import { FileText, Search } from "lucide-react"

export function SearchDialog({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const navigate = useNavigate()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onOpenChange, open])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search documentation..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {allPages.map((page) => (
            <CommandItem
              key={page.slug}
              value={page.title}
              onSelect={() => {
                navigate(`/docs/${page.slug}`)
                onOpenChange(false)
              }}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>{page.title}</span>
              <span className="ml-auto text-xs text-muted-foreground">{page.category}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Help">
          <CommandItem onSelect={() => {
            navigate("/docs/getting-started/installation")
            onOpenChange(false)
          }}>
            <Search className="mr-2 h-4 w-4" />
            <span>How to search?</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
