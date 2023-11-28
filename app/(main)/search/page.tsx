"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {

    const [searchResults, setSearchResults] = useState([]);

    const searchParams = useSearchParams();

    const search = searchParams.get('q');


    useEffect(() => {
    }, [searchParams]);

    return (
        <div>SearchPage {search}</div>
    )
}

export default SearchPage