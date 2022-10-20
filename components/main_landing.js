import React, {Fragment, useState, useRef, useEffect} from 'react';
import Head from 'next/head'
import { Navbar, Nav, NavbarBrand, NavbarToggler, Row, Col,
    Collapse, NavItem, NavLink, Container, Progress, Card,
    CardImg, CardBody, CardTitle, CardSubtitle, CardText,
    CardFooter, CardColumns, Carousel, CarouselControl,
    CarouselIndicators, CarouselItem, Form, FormGroup, Label, Input, Button,
    Toast, ToastBody } from 'reactstrap'
import useScrollPosition from '../hooks/useScrollPosition'
import { FacebookIcon, InstagramIcon, WebIcon, YoutubeIcon, 
    GithubIcon, LinkedinIcon, EmailIcon } from "../components/icons"
import Typing from '../components/typing'

function getPos(current) {
    if(current) {
        return current.getBoundingClientRect().top
    }
    else return 10000
}

function esMenor(position, array_, D){
    if(position > array_.length - 1) return position-1
    // current section distance
    const current_section = array_[position]
    // next section distance
    const next_section = array_[position+1]
    const distA = Math.abs(current_section) - Math.abs(D)
    const distB = Math.abs(next_section) - Math.abs(D)
    if(distA < distB) return position
    else return esMenor(position+1, array_, D)
}

function ActiveLink({href, currentSection, sectionName, handleClick}) {

    const handleClickNavItem = (e) => {
        e.preventDefault()
        handleClick(href)
    }

    return(
        <NavItem>
            <NavLink
                href={`#${href}`}
                onClick={handleClickNavItem}
                className={`js-scroll ${currentSection === href? 'active' : ''}`}
            >
                {sectionName}
            </NavLink>
        </NavItem>
    )
}


export default function MainLanding({words, arraySectionsOrder, extras, about_me, work_experience, my_work_and_more, contact}) {

    const [collapsed, setCollapsed] = useState(true)
    const [currentSection, setCurrentSection] = useState('home')

    const toggleNavbar = () => {
        setCollapsed(!collapsed)
        const togglerDisplayed = document.getElementsByClassName("navbar-toggler")[0]
        if (window.getComputedStyle(togglerDisplayed).display !== "none") {
            setNavType('navbar-reduce')
        } else {
            setNavType('navbar-trans')
        }
    }

    const refHome = useRef(null),
        refAbout = useRef(null),
        refSkills = useRef(null),
        refWorks = useRef(null),
        refExperience = useRef(null),
        refExtras = useRef(null),
        refContact = useRef(null)


    const [navType, setNavType] = useState('navbar-trans')
    useScrollPosition(
        ({ prevPos, currPos }) => {
            const pixels = 50
            if(Math.abs(currPos.y) > pixels)  setNavType('navbar-trans navbar-reduce')
            else  setNavType('navbar-trans')

            const arraySections = [
                getPos(refHome.current),
                getPos(refAbout.current),
                getPos(refSkills.current),
                getPos(refWorks.current),
                getPos(refExperience.current),
                getPos(refExtras.current),
                getPos(refContact.current)
            ]

            const menorPos = esMenor(0, arraySections, currPos.y)
            setCurrentSection(arraySectionsOrder[menorPos].href)
        },
        [navType],
        null,
        false,
        200
    )

    useEffect(() => {
        setCollapsed(true)
    }, [currentSection])

    const handleClickNavItem = (goToSection) => {
        const element = document.getElementById(goToSection)
        setTimeout(() => {
            window.scrollTo({
                behavior: "smooth",
                top: element ? element.offsetTop : 0
            });
        }, 100);
    }

    function link(index, href, children, addSpace=true) {
        return <Fragment key={index}><a href={href} target="_blank">{children}</a>{addSpace ? '\u00a0\u00a0' : ''}</Fragment>
    }

    /* Carousel functions */
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === extras.videos.list.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? extras.videos.list.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    /* Functions to control Form */
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [toastStatus, setToastStatus] = useState({"isOpen": false, "message":""})
    const refForm = useRef(null)

    const clearForm = () => {
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
    }

    return (
        <div>
            <Head>
                <title>Dev Folio</title>
                <meta name="viewport" content="width=device-width, user-scalable=no"/>
            </Head>

            {/*Main Navbar*/}
            <Navbar className={`navbar-b navbar-trans navbar-expand-md ${navType}`} fixed="top" expand="md" id="mainNav">
                <Container>
                    <NavbarBrand href="#page-top" className="js-scroll">DevFolio</NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className={`${collapsed ? 'collapsed' : ''} navbar-trans`} >
                        <span></span>
                        <span></span>
                        <span></span>
                    </NavbarToggler>
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav navbar className={`navbar-collapse justify-content-end`}>
                            {
                                arraySectionsOrder.map((section, i) => <ActiveLink
                                    key={i}
                                    href={section.href}
                                    sectionName={section.short_name}
                                    currentSection={currentSection}
                                    handleClick={handleClickNavItem}
                                />)
                            }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>

            {/*Intro section*/}
            <div id="home" ref={refHome} className="intro route bg-image" style={{backgroundImage: "url(/images/background2.jpg)"}}>
                <div className="overlay-itro"></div>
                <div className="intro-content display-table">
                    <div className="table-cell">
                        <div className="container">
                            <h1 className="intro-title mb-4">{about_me.greeting}</h1>

                            <div className="intro-subtitle">
                                <Typing words={words}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="main">
                {/*About Me section*/}
                <section id="about" ref={refAbout} className="about-section">
                    <Container>
                        <header className="text-center">
                            <h2 data-animate="fadeInDown" className="title">{arraySectionsOrder[1].sectionName}</h2>
                        </header>
                        <Row>

                            {/*About me description*/}
                            <Col lg={6} data-animate="fadeInUp">
                                {
                                    about_me.about_me.map((text, i) => <p key={i} dangerouslySetInnerHTML={{__html:text}}/>)
                                }
                            </Col>

                            {/*Skills items*/}
                            <Col lg={6} data-animate="fadeInUp">
                                <img src="/images/me.jpg" alt="This is me - IT worker" className="rounded-circle img-me-photo"/>
                            </Col>

                        </Row>
                    </Container>
                </section>

                {/*Skills*/}
                <section id="skills" ref={refSkills} className="skills-section">
                    <Container>
                        <header className="text-center">
                            <h2 data-animate="fadeInDown" className="title">{arraySectionsOrder[2].sectionName}</h2>
                        </header>
                        <Row>
                            <Col lg={6} data-animate="fadeInUp">
                                {
                                    about_me.core_skills.map((skill, i) =>
                                        <div className="skill-item" key={i}>
                                            <div className="progress-title">{skill.skill_name}</div>
                                            <Progress value={skill.skill_percentage} barClassName="progress-bar-skill1"/>
                                        </div>
                                    )
                                }
                            </Col>
                            <Col lg={6}>
                                <Row>
                                    {/*First column (most relevant habilities)*/}
                                    <Col sm={6} xs={12}>
                                        <ul>
                                            {
                                                Object.entries(about_me.general_skills[0]).map(([name, list], i) =>
                                                    <li key={i}>{name}
                                                        {   list.length > 0 &&
                                                        <ul>
                                                            {list.map((e,j) => <li key={j}>{e}</li>)}
                                                        </ul>
                                                        }
                                                    </li>)
                                            }
                                        </ul>
                                    </Col>
                                    {/*Second column*/}
                                    <Col sm={6} xs={12}>
                                        <ul>
                                            {
                                                Object.entries(about_me.general_skills[1]).map(([name, list], i) =>
                                                    <li key={i}>{name}
                                                        {   list.length > 0 &&
                                                        <ul>
                                                            {list.map((e,j) => <li key={j}>{e}</li>)}
                                                        </ul>
                                                        }
                                                    </li>)
                                            }
                                        </ul>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Container>
                </section>

                {/*My works and projects*/}
                <section id="works" ref={refWorks}>
                    <Container>
                        <header className="text-center">
                            <h2 data-animate="fadeInDown" className="title">{arraySectionsOrder[3].sectionName}</h2>
                        </header>
                        <Row>
                            <CardColumns>
                                {
                                    my_work_and_more.map((work, i) => (
                                        <Card key={i}>
                                            <CardBody>
                                                <CardTitle>{work.title}</CardTitle>
                                                <CardSubtitle>{work.subtitle}</CardSubtitle>
                                            </CardBody>
                                            <CardImg top width="100%" src={work.image} alt=":)" />
                                            <CardBody>
                                                <CardText>{work.description}</CardText>
                                            </CardBody>
                                            <CardFooter>
                                                {
                                                    Object.entries(work.networks).map(([key, value], j) => {
                                                        switch (key) {
                                                            case 'facebook':
                                                                return link(j, value.href, <FacebookIcon style={{width: "10%"}}/>)
                                                                break
                                                            case 'instagram':
                                                                return link(j, value.href, <InstagramIcon style={{width: "10%"}}/>)
                                                                break
                                                            case 'youtube':
                                                                return link(j, value.href, <YoutubeIcon style={{width: "10%"}}/>)
                                                                break
                                                            case 'www':
                                                                return link(j, value.href, <WebIcon style={{width: "10%"}}/>)
                                                                break
                                                        }
                                                    })
                                                }
                                            </CardFooter>
                                        </Card>
                                    ))
                                }
                            </CardColumns>
                        </Row>
                    </Container>
                </section>

                {/*Work experience*/}
                <section id="experience" ref={refExperience}>
                    <Container>
                        <header className="text-center">
                            <h2 data-animate="fadeInDown" className="title">{arraySectionsOrder[4].sectionName}</h2>
                        </header>
                        {
                            work_experience.map((w_e, i) => (
                                <Fragment key={i}>
                                    <Row>
                                        <Col lg={4}>
                                            <p className="color-a"><strong>{w_e.work_name} | </strong>{w_e.work_location}</p>
                                            <p><strong>{w_e.work_position}</strong></p>
                                            <p>{w_e.work_time}</p>
                                        </Col>
                                        <Col lg={8}>
                                            {
                                                w_e.description.map((d, j) => <p key={j}>
                                                    <span className="color-a">&#9632;</span>&nbsp;&nbsp;{d}
                                                </p>)
                                            }
                                        </Col>
                                    </Row>
                                    { (work_experience.length - 1) > i && <hr/> }
                                </Fragment>
                            ))
                        }
                    </Container>
                </section>

                {/*Extras*/}
                <section id="extras" ref={refExtras}>
                    <Container>
                        <header className="text-center">
                            <h2 data-animate="fadeInDown" className="title">{arraySectionsOrder[5].sectionName}</h2>
                        </header>
                        <Row>
                            <Col>
                                <p>{extras.repos.description}</p>
                                {
                                    extras.repos.list.map((repo, i) =>
                                        <p key={i}>
                                            {link(0, repo.href, <GithubIcon style={{width:"25px", float:"left", marginRight:"10px"}}/>, false)}
                                            <strong>{repo.title}</strong>
                                        </p>
                                    )
                                }
                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <Row>
                            <Col sm={12}>
                                <p>
                                    {extras.videos.description}
                                </p>
                            </Col>
                            <Col sm={12}>
                                <Carousel
                                    activeIndex={activeIndex}
                                    next={next}
                                    previous={previous}
                                >
                                    <CarouselIndicators items={extras.videos.list} activeIndex={activeIndex} onClickHandler={goToIndex} />
                                    {
                                        extras.videos.list.map((item) => {
                                            return (
                                                <CarouselItem
                                                    onExiting={() => setAnimating(true)}
                                                    onExited={() => setAnimating(false)}
                                                    key={item.image}
                                                >
                                                    <a href={item.href} target="__blank">
                                                        <img src={item.image} alt="Lool" />
                                                    </a>
                                                </CarouselItem>
                                            );
                                        })
                                    }
                                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                                </Carousel>
                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <Row>
                            <Col>
                                <p>
                                    {extras.papers.description}
                                </p>
                                {
                                    extras.papers.list.map((paper, i) =>
                                        <p key={i}>
                                            {link(0, paper.href, <WebIcon style={{width:"25px", float:"left", marginRight:"10px"}}/>, false)}
                                            <strong>{paper.title}</strong>
                                        </p>
                                    )
                                }
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/*Contacto*/}
                <section id="contact" ref={refContact}>
                    <Container>
                        <header className="text-center">
                            <h2 data-animate="fadeInDown" className="title">{arraySectionsOrder[6].sectionName}</h2>
                        </header>

                        <Row>
                            <Col md={6}>
                            <p>
                                <EmailIcon style={{width:"25px", float:"left", marginRight:"10px"}}/>
                                <a href="mailto:andrescarvajaldev@gmail.com">
                                    andrescarvajaldev@gmail.com
                                </a>
                            </p>
                            </Col>
                            <Col md={6}>
                            <p>
                                <LinkedinIcon style={{width:"25px", float:"left", marginRight:"10px"}}/>
                                <a href="https://www.linkedin.com/in/rubén-carvajal-ulloa-62aa67159" target="_blank">
                                    Rubén Carvajal
                                </a>
                            </p>
                            </Col>
                        </Row>
                    </Container>
                </section>


            </div>
        </div>
    )
}

/* This functions is executed one when building the page or every time I request the page
* in development mode
* */
/*export async function getStaticProps() {
    return {
        props: {
            allPostsData
        }
    }
}*/

