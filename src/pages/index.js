import styles from "../styles/Home.module.css"

import Layout from "../components/Layout/Layout"
import SearchInput from "../components/SerachInput/SearchInput";
import CountryTable from "../components/CountryTable/CountryTable";

function Home({countries}) {
    return <Layout>
        <div className={styles.counts}>Found {countries.length} countries</div>
        <SearchInput placeholder="Filter by Name, Region or SubRegion"/>
        <CountryTable countries={countries}/>
    </Layout>
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
