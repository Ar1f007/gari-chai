import { SearchFilters } from "@/modules/search/SearchFilters"
import { ReactNode } from "react"

const SearchPageLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className="grid sm:grid-cols-1 lg:grid-cols-5 gap-4 px-4 my-6">
            <aside className="p-4">
                <SearchFilters />
            </aside>
            <main className="p-4 col-span-4">
                {children}
            </main>
        </section>

    )
}

export default SearchPageLayout