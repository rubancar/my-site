import {Fragment} from "react";

const rows = []

function getScreenSize(number) {
    if(number < 768) return 'xs'
    else if(number >= 768 && number < 992 ) return 'sm'
    else if(number >= 992 && number < 1200) return 'md'
    else return 'lg'
}

export default function LayoutWorkSection({ screenWidth }) {

    const screen_size = getScreenSize(screenWidth)
    console.log('screen_size', screen_size)
    return (
        <Fragment>
            rows
        </Fragment>
    )
}
