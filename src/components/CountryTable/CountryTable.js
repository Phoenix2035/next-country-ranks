import styles from "./CountryTable.module.css"

import {orderBy, numberSeparator, SortArrow} from "../../utils/helpers";
import {useState} from "react";


const CountryTable = ({countries}) => {
    const [dir, setDir] = useState()
    const [value, setValue] = useState()

    const orderedCountry = orderBy(countries, value, dir)

    const switchDirection = () => {
        if (!dir) {
            setDir("des")
        } else if (dir === "des") {
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
                    <div className={styles.row} key={item.name}>
                        <div className={styles.name}>
                            {item.name}
                        </div>

                        <div className={styles.population}>
                            {numberSeparator(item.population)}
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default CountryTable
