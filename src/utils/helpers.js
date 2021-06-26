import styles from "../components/CountryTable/CountryTable.module.css";
import {KeyboardArrowDownRounded, KeyboardArrowUpRounded} from "@material-ui/icons";

export const orderBy = (countries, value, direction) => {
    switch (direction) {
        case "asc":
            return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1)
        case "desc":
            return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1)
        default:
            return countries
    }
}

export const SortArrow = ({direction}) => {
    if (!direction) return null

    if (direction === "asc") {
        return <div className={styles.heading_arrow}>
            <KeyboardArrowUpRounded color="inherit"/>
        </div>
    } else {
        return <div className={styles.heading_arrow}>
            <KeyboardArrowDownRounded color="inherit"/>
        </div>
    }
}




export const numberSeparator = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


