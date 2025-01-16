import React from "react"

import { Button } from "../../reusible_components/Button"

import bannerImage from "../../../res/images/banner_image_education_amico.svg"

export const MainBannerSection = React.memo(() => {
    return (
        <div className="contentWrapper">
            <div className='bannerWrapper'>
                <div className="bannerContainer">
                    <div className="bannerInfoContainer">
                        <h1>Lorem ipsum dolor <span>sit amet</span> consectetur, adipisicing elit.</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                            Culpa explicabo cum accusantium repellendus impedit dignissimos aperiam 
                            labore sapiente voluptatum necessitatibus quas, ipsa corporis doloribus nemo, 
                            odit praesentium vel fugit quo deserunt voluptatibus laborum voluptates illo odio? 
                            Excepturi mollitia autem, quae accusamus in reiciendis deleniti quisquam suscipit 
                            voluptates beatae magnam consequuntur voluptas ipsam sint iste. 
                            Est incidunt labore sunt sequi officia!</p>
                        <Button key={"mainBannerTest0"}
                                buttonType={"testVariants"}
                                buttonPadding={"0 20px"}
                                buttonText={"Пройти пробные варианты"}
                                buttonFunc={()=>{}}/>
                    </div>
                    <div className="bannerImageContainer">
                        <img src={bannerImage} alt="bannerImg" loading="lazy"/>
                    </div>
                </div>
            </div>
        </div>
    )
})