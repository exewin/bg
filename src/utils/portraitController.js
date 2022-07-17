import p0 from "../assets/portraits/0.jpeg"
import p1 from "../assets/portraits/1.jpeg"
import p2 from "../assets/portraits/2.jpeg"
import p3 from "../assets/portraits/3.jpeg"
import p4 from "../assets/portraits/4.jpeg"
import p5 from "../assets/portraits/5.jpeg"
import p6 from "../assets/portraits/6.jpeg"
import p7 from "../assets/portraits/7.jpeg"
import p8 from "../assets/portraits/8.jpeg"
import p9 from "../assets/portraits/9.jpeg"
import p10 from "../assets/portraits/10.jpeg"
import p11 from "../assets/portraits/11.jpeg"
import p12 from "../assets/portraits/12.jpeg"
import p13 from "../assets/portraits/13.jpeg"
import p14 from "../assets/portraits/14.jpeg"

import p15 from "../assets/portraits/15.jpeg"
import p16 from "../assets/portraits/16.jpeg"
import p17 from "../assets/portraits/17.jpeg"

export const availablePortraits = 14
export const selectPortrait = (int) => {
    if(int >= portraits.length)
        return 0
    else if(int < 0)
        return portraits.length-1
    else
        return int
}

export const portraits = [p0,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17]