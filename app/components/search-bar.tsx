import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Search } from "lucide-react"
import { useState } from "react"

type Props = {
  width?: number | string
  searchAction: (query: string) => void
}

export function SearchBar({width=400, searchAction }: Props) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchAction(query)
  }

  return (
    <form onSubmit={handleSearch} className={`w-[${width}px] max-w-md`}>
  <div className="flex items-center rounded-md border border-input overflow-hidden bg-background">
    <Input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="flex-grow border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
    />    
    <Button type="submit" variant="ghost" className="rounded-none px-3">
      <Search className="h-4 w-4" />
    </Button>
  </div>
</form>


  )
}
