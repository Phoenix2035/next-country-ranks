import { useState } from "react";
import styles from "../styles/Home.module.css"

import Layout from "../components/Layout/Layout"
import SearchInput from "../components/SerachInput/SearchInput";
import CountryTable from "../components/CountryTable/CountryTable";

function Home({ countries }) {

    const [keyword, setKeyword] = useState("")

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(keyword) ||
        country.region.toLowerCase().includes(keyword) ||
        country.subregion.toLowerCase().includes(keyword)
    )

    const handleSearch = e => {
        setKeyword(e.target.value.toLowerCase())
    }
    return (
        <Layout>
            <div className={styles.input_container}>
                <div className={styles.counts}>Found {countries.length} countries</div>

                <div className={styles.input}>
                    <SearchInput placeholder="Filter by Name, Region or SubRegion" onChange={handleSearch} />
                </div>

            </div>
            <CountryTable countries={filteredCountries} />
        </Layout>
    )
}

export const getStaticProps = async () => {
    const res = await fetch("https://restcountries.eu/rest/v2/all")
    const countries = await res.json()

    return {
        props: {
            countries
        }
    }
}


export default Home
