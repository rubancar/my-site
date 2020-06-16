import React from 'react'
import MainLanding from '../../components/main_landing'
import aboutMe_en from '../../info_site/main_sections/about_me.en'
import workExperience_en from '../../info_site/main_sections/work_experience.en'
import my_work_and_more_en from '../../info_site/main_sections/my_work_and_more.en'
import extras_en from '../../info_site/main_sections/extras.en'
import sections from '../../info_site/main_sections/sections.en'
import words from '../../info_site/main_sections/words.en'
import contact from '../../info_site/main_sections/contact.en'

export default function HomeEnglish() {

    return (
        <MainLanding
            words={words}
            arraySectionsOrder={sections}
            extras={extras_en}
            about_me={aboutMe_en}
            work_experience={workExperience_en}
            my_work_and_more={my_work_and_more_en}
            contact={contact}
        />
    )
}