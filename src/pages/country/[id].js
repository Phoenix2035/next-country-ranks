import styles from "./Country.module.css"
import Layout from "../../components/Layout/Layout";
import {useEffect, useState} from "react";


const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
    return await res.json()

}


const Country = ({country}) => {
    const [borders, setBorders] = useState([])

    const getBorders = async () => {
        const borders = await Promise.all(
            country.borders.map(border =>
                getCountry(border)
            )
        )

        setBorders(borders)
    }


    useEffect(() => {
        getBorders()

    }, [])

    return (
        <Layout title={country.name}>
            <div className={styles.container}>
                <div className={styles.container_left}>
                    <div className={styles.overview_panel}>
                        <img src={country.flag} alt={country.name}/>
                        <h1 className={styles.overview_name}>{country.name}</h1>
                        <div className={styles.overview_region}>{country.region}</div>

                        <div className={styles.overview_numbers}>
                            <div className={styles.overview_population}>
                                <div className={styles.overview_value}>{country.population}</div>
                                <div className={styles.overview_label}>Population</div>
                            </div>
                            <div className={styles.overview_area}>
                                <div className={styles.overview_value}>{country.area}</div>
                                <div className={styles.overview_label}>Area</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.container_right}>
                    <div className={styles.details_panel}>
                        <h2>Details</h2>
                        <div className={styles.details_panel_row}>
                            <div>Capital</div>
                            <div>{country.capital}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div>Sub Region</div>
                            <div>{country.subregion}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div>Language</div>
                            <div>{country.languages.map(({name}) => name).join(", ")}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div>Currencies</div>
                            <div>{country.currencies.map(({name}) => name).join(", ")}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div>Native Name</div>
                            <div>{country.nativeName}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div>Gini</div>
                            <div>{country.gini}%</div>
                        </div>

                        <div className={styles.details_panel_borders}>
                            <div>Neighbouring Countries</div>
                            <div className={styles.details_panel_borders_container}>
                                {
                                    borders && borders.map(item =>
                                        <div key={item.name} className={styles.details_panel_borders_country}>
                                            <img src={item.flag} alt={item.name}/>
                                            <div>{item.name}</div>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export const getServerSideProps = async ({params}) => {
    const country = await getCountry(params.id)
    return {
        props: {
            country
        }
    }
}

export default Country



