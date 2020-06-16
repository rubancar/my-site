import React from 'react'
import MainLanding from '../../components/main_landing'
import aboutMe_es from '../../info_site/main_sections/about_me.es'
import workExperience_es from '../../info_site/main_sections/work_experience.es'
import my_work_and_more_es from '../../info_site/main_sections/my_work_and_more.es'
import extras_es from '../../info_site/main_sections/extras.es'
import sections from '../../info_site/main_sections/sections.es'
import words from '../../info_site/main_sections/words.es'
import contact from '../../info_site/main_sections/contact.es'

export default function HomeSpanish() {

    return (
        <MainLanding
            words={words}
            arraySectionsOrder={sections}
            extras={extras_es}
            about_me={aboutMe_es}
            work_experience={workExperience_es}
            my_work_and_more={my_work_and_more_es}
            contact={contact}
        />
    )
}