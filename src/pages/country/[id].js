import styles from "./country.module.css"
import Layout from "../../components/Layout/Layout";
import {numberSeparator} from "../../utils/helpers";

const Country = ({country}) => {
    console.log(country)
    return (
        <Layout title={country.name}>
            <div>
                <div className={styles.overview_panel}>
                    <img src={country.flag} alt={country.name}/>
                    <h1 className={styles.overview_name}>{country.name}</h1>
                    <div className={styles.overview_region}>{country.region}</div>

                    <div className={styles.overview_numbers}>
                        <div className={styles.overview_population}>
                            <div className={styles.overview_value}>{numberSeparator(country.population)}</div>
                            <div className={styles.overview_label}>Population</div>
                        </div>
                        <div className={styles.overview_area}>
                            <div className={styles.overview_value}>{numberSeparator(country.area)}</div>
                            <div className={styles.overview_label}>Area</div>
                        </div>
                    </div>
                </div>
                <div className={styles.details_panel}>
                    <h4>Details</h4>
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



                </div>
            </div>
        </Layout>
    );
};

export const getServerSideProps = async ({params}) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.id}`)
    const country = await res.json()
    return {
        props: {
            country
        }
    }
}

export default Country



