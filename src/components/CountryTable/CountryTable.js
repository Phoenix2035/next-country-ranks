import Link from "next/link"

import styles from "./CountryTable.module.css"

import {numberSeparator, orderBy, SortArrow} from "../../utils/helpers";
import {useState} from "react";


const CountryTable = ({countries}) => {
    const [dir, setDir] = useState()
    const [value, setValue] = useState()

    const orderedCountry = orderBy(countries, value, dir)

    const switchDirection = () => {
        if (!dir) {
            setDir("desc")
        } else if (dir === "desc") {
            setDir("asc")
        } else {
            setDir(null)
        }
    }

    const setValueAndDirection = value => {
        switchDirection()
        setValue(value)
    }

    return (
        <div>
            <div className={styles.heading}>
                <button className={styles.heading_name} onClick={() => setValueAndDirection("name")}>
                    <div>Name</div>
                    <SortArrow/>
                </button>

                <button className={styles.heading_population} onClick={() => setValueAndDirection("population")}>
                    <div>Population</div>
                    <SortArrow direction={dir}/>
                </button>
            </div>
            {
                orderedCountry.map(item =>
                    <Link href={`/country/${item.alpha3Code}`}>
                        <div className={styles.row} key={item.name}>
                            <div className={styles.name}>
                                {item.name}
                            </div>

                            <div className={styles.population}>
                                {numberSeparator(item.population)}
                            </div>
                        </div>
                    </Link>
                )
            }
        </div>
    )
};

export default CountryTable
